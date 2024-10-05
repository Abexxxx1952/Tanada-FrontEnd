"use server";
import { ErrorData } from "@/srcApp/shared/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { getCookies } from "@/srcApp/features/auth/cookies/model/getCookies";
import { refreshTokens } from "@/srcApp/features/auth/refresh-tokens/model/refresh-tokens";
import { Photo } from "@/srcApp/entities/photo/model/types";
import { revalidateTag } from "next/cache";

export async function deletePhoto(
  photoId: number,
  userId: string | null
): Promise<Photo | undefined | ErrorData> {
  const { access_token, refresh_token } = await getCookies();
  try {
    if (access_token) {
      const response = await fetch(
        `${process.env.DELETE_PHOTO_PATH}/${photoId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      revalidateTag("photoAll");
      revalidateTag(`photoById${userId}`);
      revalidateTag("photoStats");

      if (!response.ok) {
        const errorData: ErrorData = await response.json();

        throw errorData;
      }

      const data: Photo = await response.json();

      return data;
    }
    if (!access_token && refresh_token) {
      return await refreshTokens(refresh_token, deletePhoto);
    }
  } catch (error: unknown) {
    if (isErrorData(error)) {
      return error;
    } else {
      console.log("error", error);
    }
  }
}
