"use server";
import { ErrorData } from "@/srcApp/shared/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { CreateSignedUrlResponse } from "@/srcApp/entities/photo/model/types";
import { getCookies } from "@/srcApp/features/auth/cookies/model/getCookies";
import { refreshTokens } from "@/srcApp/features/auth/refresh-tokens/model/refresh-tokens";

export async function createSignedUrl(
  fileName: string
): Promise<CreateSignedUrlResponse | undefined | ErrorData> {
  const { access_token, refresh_token } = await getCookies();
  try {
    if (access_token) {
      const response = await fetch(
        `${process.env.GET_SIGNED_UPLOAD_URL_PATH}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify({ fileName }),
        }
      );

      if (!response.ok) {
        const errorData: ErrorData = await response.json();

        throw errorData;
      }

      const data: CreateSignedUrlResponse = await response.json();

      return data;
    }
    if (!access_token && refresh_token) {
      return await refreshTokens(refresh_token, createSignedUrl);
    }
  } catch (error: unknown) {
    if (isErrorData(error)) {
      return error;
    } else {
      console.log("error", error);
    }
  }
}
