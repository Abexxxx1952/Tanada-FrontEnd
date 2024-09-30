"use server";
import { ErrorData } from "@/srcApp/shared/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { getCookies } from "@/srcApp/features/auth/cookies/model/getCookies";
import { refreshTokens } from "@/srcApp/features/auth/refresh-tokens/model/refresh-tokens";
import { UpdateResult } from "@/srcApp/shared/model/types";
import { revalidateTag } from "next/cache";

export async function updatePhotoLink(
  currentPhotoId: number,
  link: string,
  userId: string | undefined
): Promise<UpdateResult | undefined | ErrorData> {
  const { access_token, refresh_token } = await getCookies();
  try {
    if (access_token) {
      const bodyParams = {
        id: currentPhotoId,
        link: link,
      };

      const response = await fetch(`${process.env.UPDATE_PHOTO_PATH}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(bodyParams),
      });

      revalidateTag("photoAll");
      revalidateTag(`photoById${userId}`);
      revalidateTag("photoStats");

      if (!response.ok) {
        const errorData: ErrorData = await response.json();

        throw errorData;
      }

      const data: UpdateResult = await response.json();

      return data;
    }
    if (!access_token && refresh_token) {
      return await refreshTokens(refresh_token, updatePhotoLink);
    }
  } catch (error: unknown) {
    if (isErrorData(error)) {
      return error;
    } else {
      console.log("error", error);
    }
  }
}
