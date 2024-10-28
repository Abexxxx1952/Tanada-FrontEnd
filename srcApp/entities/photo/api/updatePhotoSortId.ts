"use client";
import { ErrorData } from "@/srcApp/shared/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { UpdateResult } from "@/srcApp/shared/model/types";

export async function updatePhoToSortId(
  photoId: number,
  sortId: number,
  access_token: string,
  signal?: AbortSignal
): Promise<UpdateResult | undefined | ErrorData> {
  try {
    if (access_token) {
      const bodyParams = {
        id: photoId,
        sortId: sortId,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_UPDATE_PHOTO_PATH}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(bodyParams),
          signal: signal,
        }
      );

      if (!response.ok) {
        const errorData: ErrorData = await response.json();

        throw errorData;
      }

      const data: UpdateResult = await response.json();

      return data;
    }
  } catch (error: unknown) {
    if (isErrorData(error)) {
      return error;
    } else {
      console.log("error", error);
    }
  }
}
