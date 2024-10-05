"use client";
import { ErrorData } from "@/srcApp/shared/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { getCookies } from "@/srcApp/features/auth/cookies/model/getCookies";
import { refreshTokens } from "@/srcApp/features/auth/refresh-tokens/model/refresh-tokens";
import { UpdateResult } from "@/srcApp/shared/model/types";

export async function updatePhotoSortId(
  photoId: number,
  sortId: number,
  userId: string | null,
  signal?: AbortSignal
): Promise<UpdateResult | undefined | ErrorData> {
  const { access_token, refresh_token } = await getCookies();
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
      await fetch(`/api/revalidatePhotoByUserId/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: UpdateResult = await response.json();

      return data;
    }
    if (!access_token && refresh_token) {
      return await refreshTokens(refresh_token, updatePhotoSortId);
    }
  } catch (error: unknown) {
    if (isErrorData(error)) {
      return error;
    } else {
      console.log("error", error);
    }
  }
}
