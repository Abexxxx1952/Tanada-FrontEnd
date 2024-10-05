"use client";
import { ErrorData, UpdateResult } from "@/srcApp/shared/model/types";
import { Photo } from "@/srcApp/entities/photo/model/types";
import { UserFromServer } from "@/srcApp/entities/user/model/types";
import { toast } from "react-toastify";
import { shuffleArray } from "@/srcApp/shared/model/shuffleArray";
import { fetchAllPhoto } from "./fetchAllPhotoData";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { fetchAllPhotoByUserId } from "./fetchPhotoDataByUserId";
import { updatePhotoSortId } from "./updatePhotoSortId";

const fetchCall = async (
  photoId: number,
  sortId: number,
  userId: string | null,
  resolve: (value: UpdateResult) => void,
  reject: (reason?: any) => void,
  signal: AbortSignal
): Promise<void> => {
  try {
    const response = await updatePhotoSortId(photoId, sortId, userId, signal);

    if (isErrorData(response) || response === undefined) {
      throw new Error("Fetch call failed");
    }

    resolve(response);
  } catch (error) {
    reject(error);
  }
};

const revertCall = async (
  id: number,
  sortId: number,
  userId: string,
  setPhotos: React.Dispatch<React.SetStateAction<Photo[] | null>>
): Promise<UpdateResult | undefined> => {
  try {
    const response = await updatePhotoSortId(id, sortId, userId, undefined);

    if (isErrorData(response) || response === undefined) {
      throw new Error("RevertCall failed");
    }

    return response;
  } catch (error) {
    const result = await fetchAllPhotoByUserId(userId);
    if (!isErrorData(result) && result !== undefined) {
      setPhotos(result);
    }
    console.log(error);
  }
};

function trackPromiseState<T>(promise: Promise<T>) {
  let isFulfilled = false;
  let isRejected = false;

  promise
    .then(() => {
      isFulfilled = true;
    })
    .catch(() => {
      isRejected = true;
    });

  return {
    isFulfilled: () => isFulfilled,
    isRejected: () => isRejected,
  };
}

export async function swapSortId(
  photo_1: Photo,
  photo_2: Photo,
  userId: string,
  setPhotos: React.Dispatch<React.SetStateAction<Photo[] | null>>
): Promise<[UpdateResult, UpdateResult] | undefined> {
  const controller1 = new AbortController();
  const controller2 = new AbortController();

  const {
    promise: cancellablePromise1,
    resolve: resolve1,
    reject: reject1,
  } = Promise.withResolvers<UpdateResult>();
  const {
    promise: cancellablePromise2,
    resolve: resolve2,
    reject: reject2,
  } = Promise.withResolvers<UpdateResult>();

  // Monitoring the state of promises
  const cancellablePromise1State = trackPromiseState(cancellablePromise1);
  const cancellablePromise2State = trackPromiseState(cancellablePromise2);

  // Start the first fetch call to swap sortId
  fetchCall(
    photo_1.id,
    photo_2.sortId,
    userId,
    resolve1,
    reject1,
    controller1.signal
  );

  // Start the second fetch call to swap sortId
  fetchCall(
    photo_2.id,
    photo_1.sortId,
    userId,
    resolve2,
    reject2,
    controller2.signal
  );

  try {
    const results = await Promise.all([
      cancellablePromise1,
      cancellablePromise2,
    ]);

    return results;
  } catch (error) {
    // If one of the promises is rejected, abort the other one
    controller1.abort();
    controller2.abort();

    // If the request has already completed, make a request to revert the original sortIds
    if (cancellablePromise1State.isFulfilled()) {
      await revertCall(photo_1.id, photo_1.sortId, userId, setPhotos);
    }
    if (cancellablePromise2State.isFulfilled()) {
      await revertCall(photo_2.id, photo_2.sortId, userId, setPhotos);
    }

    console.log(error);
  }
}
