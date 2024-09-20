"use client";
import { ErrorData } from "@/srcApp/shared/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import {
  PhotosStatsResult,
  UsersStatsResult,
} from "../../../entities/stats/model/types";
import { toast } from "react-toastify";

export async function fetchPhotosStatsWrapperWithOutId<
  T extends PhotosStatsResult | PhotosStatsResult[] | UsersStatsResult
>(
  fetchFunc: () => Promise<T | ErrorData | undefined>,
  resultSetter: React.Dispatch<React.SetStateAction<T | null>>
): Promise<T | ErrorData | undefined> {
  try {
    const photosStatsOrError: T | undefined | ErrorData = await fetchFunc();

    if (isErrorData(photosStatsOrError)) {
      toast.error(
        `Error: ${photosStatsOrError.status} ${
          photosStatsOrError.statusText
        }. Message: ${JSON.stringify(photosStatsOrError)}`,
        {
          position: "top-right",
        }
      );
    }

    if (photosStatsOrError !== undefined && !isErrorData(photosStatsOrError)) {
      resultSetter(photosStatsOrError);
    }

    return photosStatsOrError;
  } catch (error: unknown) {
    if (isErrorData(error)) {
      return error;
    } else {
      console.log("error", error);
      return undefined;
    }
  }
}
