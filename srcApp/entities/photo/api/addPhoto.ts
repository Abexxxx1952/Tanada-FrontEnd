"use server";
import { ErrorData } from "@/srcApp/shared/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { Photo } from "@/srcApp/entities/photo/model/types";
import { getCookies } from "@/srcApp/features/auth/cookies/model/getCookies";
import { refreshTokens } from "@/srcApp/features/auth/refresh-tokens/model/refresh-tokens";
import { revalidateTag } from "next/cache";

export async function addPhoto(
  link: string,
  userId: string | null
): Promise<Photo | undefined | ErrorData> {
  const { access_token, refresh_token } = await getCookies();
  try {
    if (access_token) {
      const response = await fetch(`${process.env.ADD_PHOTO_PATH}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          link: link,
        }),
      });

      if (!response.ok) {
        const errorData: ErrorData = await response.json();

        throw errorData;
      }
      revalidateTag("photoAll");
      revalidateTag(`photoById${userId}`);
      revalidateTag("photoStats");

      const data: Photo = await response.json();

      return data;
    }
    if (!access_token && refresh_token) {
      return await refreshTokens(refresh_token, addPhoto);
    }
  } catch (error: unknown) {
    if (isErrorData(error)) {
      return error;
    } else {
      console.log("error", error);
    }
  }
}
