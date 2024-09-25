"use server";
import { AttachedUser } from "@/srcApp/entities/user/model/types";
import { ErrorData } from "@/srcApp/shared/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { getCookies } from "@/srcApp/features/auth/cookies/model/getCookies";
import { refreshTokens } from "@/srcApp/features/auth/refresh-tokens/model/refresh-tokens";
import { clearCookies } from "@/srcApp/features/auth/cookies/model/clearCookies";
import { revalidateTag } from "next/cache";

export async function logoutUser(): Promise<
  AttachedUser | ErrorData | undefined
> {
  const url: string = process.env.LOGOUT_URL || "";

  const { access_token, refresh_token } = await getCookies();

  try {
    if (access_token) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (!response.ok) {
        const errorData: ErrorData = await response.json();
        throw errorData;
      }

      const data: AttachedUser = await response.json();
      await clearCookies();
      revalidateTag("userByCookies");
      return data;
    }
    if (!access_token && refresh_token) {
      return await refreshTokens(refresh_token, logoutUser);
    }
  } catch (error) {
    if (isErrorData(error)) {
      return error;
    } else {
      console.log("error", error);
    }
  }
}
