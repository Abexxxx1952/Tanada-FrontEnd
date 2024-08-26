"use server";
import { AttachedUser } from "../../../../entities/user/model/types";
import { ErrorData } from "@/srcApp/features/user/model/types";
import { isErrorData } from "@/srcApp/features/user/lib/isErrorData";
import { getCookies } from "../../cookies/model/getCookies";
import { refreshTokens } from "../../refresh-tokens/model/refresh-tokens";
import { clearCookies } from "../../cookies/model/clearCookies";

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
