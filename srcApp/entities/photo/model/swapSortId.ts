"use client";
import { UpdateResult } from "@/srcApp/shared/model/types";
import { Photo } from "@/srcApp/entities/photo/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { fetchAllPhotoByUserId } from "../api/fetchPhotoDataByUserId";
import { updatePhoToSortId } from "../api/updatePhotoSortId";
import { getCookies } from "@/srcApp/features/auth/cookies/model/getCookies";
import { refreshTokens } from "@/srcApp/features/auth/refresh-tokens/model/refresh-tokens";

const fetchCall = async (
  photoId: number,
  sortId: number,
  access_token: string,
  resolve: (value: UpdateResult) => void,
  reject: (reason?: any) => void,
  abortControllerRef: React.MutableRefObject<AbortController | null>
): Promise<void> => {
  try {
    const response = await updatePhoToSortId(
      photoId,
      sortId,
      access_token,
      abortControllerRef.current?.signal
    );

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
  access_token: string,
  userId: string,
  setPhotos: React.Dispatch<React.SetStateAction<Photo[] | null>>,
  abortControllerRef: React.MutableRefObject<AbortController | null>
): Promise<UpdateResult | undefined> => {
  try {
    const response = await updatePhoToSortId(
      id,
      sortId,
      access_token,
      undefined
    );

    if (isErrorData(response) || response === undefined) {
      throw new Error("RevertCall failed");
    }

    return response;
  } catch (error) {
    const result = await fetchAllPhotoByUserId(userId, abortControllerRef);
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
  setPhotos: React.Dispatch<React.SetStateAction<Photo[] | null>>,
  abortControllerRef1: React.MutableRefObject<AbortController | null>,
  abortControllerRef2: React.MutableRefObject<AbortController | null>
): Promise<[UpdateResult, UpdateResult] | undefined> {
  const { access_token, refresh_token } = await getCookies();

  if (access_token) {
    abortControllerRef1.current = new AbortController();
    abortControllerRef2.current = new AbortController();

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
      access_token,
      resolve1,
      reject1,
      abortControllerRef1
    );

    // Start the second fetch call to swap sortId
    fetchCall(
      photo_2.id,
      photo_1.sortId,
      access_token,
      resolve2,
      reject2,
      abortControllerRef2
    );

    try {
      const results = await Promise.all([
        cancellablePromise1,
        cancellablePromise2,
      ]);

      return results;
    } catch (error) {
      // If one of the promises is rejected, abort the other one
      abortControllerRef1.current.abort();
      abortControllerRef2.current.abort();

      // If the request has already completed, make a request to revert the original sortIds
      if (cancellablePromise1State.isFulfilled()) {
        await revertCall(
          photo_1.id,
          photo_1.sortId,
          access_token,
          userId,
          setPhotos,
          abortControllerRef1
        );
      }
      if (cancellablePromise2State.isFulfilled()) {
        await revertCall(
          photo_2.id,
          photo_2.sortId,
          access_token,
          userId,
          setPhotos,
          abortControllerRef2
        );
      }
    } finally {
      await fetch(`/api/revalidatePhotoByUserId/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
    }
  }
  if (!access_token && refresh_token) {
    return await refreshTokens(refresh_token, swapSortId);
  }
}
