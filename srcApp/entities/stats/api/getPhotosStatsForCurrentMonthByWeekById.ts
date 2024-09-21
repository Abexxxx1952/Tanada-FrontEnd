"use server";
import { ErrorData } from "@/srcApp/shared/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { PhotosStatsResult } from "../model/types";

export async function getPhotosStatsForCurrentMonthByWeekById(
  id: string
): Promise<PhotosStatsResult[] | ErrorData | undefined> {
  try {
    const response = await fetch(
      `${process.env.GET_PHOTO_STATS_FOR_CURRENT_MONTH_BY_WEEK_BY_ID}/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData: ErrorData = await response.json();

      throw errorData;
    }

    const data: PhotosStatsResult[] = await response.json();

    return data;
  } catch (error: unknown) {
    if (isErrorData(error)) {
      return error;
    } else {
      console.log("error", error);
    }
  }
}