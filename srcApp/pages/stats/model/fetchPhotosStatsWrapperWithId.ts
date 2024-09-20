"use client";
import { ErrorData } from "@/srcApp/shared/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { PhotosStatsResult } from "../../../entities/stats/model/types";
import { toast } from "react-toastify";

export async function fetchPhotosStatsWrapperWithId<
  T extends PhotosStatsResult | PhotosStatsResult[]
>(
  fetchFunc: (id: string) => Promise<T | ErrorData | undefined>,
  resultSetter: React.Dispatch<React.SetStateAction<T | null>>,
  id: string
): Promise<T | ErrorData | undefined> {
  try {
    const photosStatsOrError: T | undefined | ErrorData = await fetchFunc(id);

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
