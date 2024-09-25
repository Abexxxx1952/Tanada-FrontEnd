"use server";
import { ErrorData } from "@/srcApp/shared/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { PhotosStatsResult } from "../model/types";

export async function getGeneralPhotosStats(): Promise<
  PhotosStatsResult | ErrorData | undefined
> {
  try {
    const response = await fetch(`${process.env.GET_ALL_PHOTOS_STATS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
      next: {
        tags: ["photoStats"],
      },
    });

    if (!response.ok) {
      const errorData: ErrorData = await response.json();

      throw errorData;
    }

    const data: PhotosStatsResult = await response.json();

    return data;
  } catch (error: unknown) {
    if (isErrorData(error)) {
      return error;
    } else {
      console.log("error", error);
    }
  }
}
