"use server";
import { UserFromServer } from "@/srcApp/entities/user/model/types";
import { ErrorData } from "@/srcApp/shared/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { getCookies } from "@/srcApp/features/auth/cookies/model/getCookies";
import { refreshTokens } from "@/srcApp/features/auth/refresh-tokens/model/refresh-tokens";

let controller: AbortController | null = null;
export async function fetchUserData(): Promise<
  UserFromServer | undefined | ErrorData
> {
  if (controller) {
    controller.abort();
  }

  controller = new AbortController();
  const { signal } = controller;

  const { access_token, refresh_token } = await getCookies();
  if (!access_token && !refresh_token) {
    return;
  }

  try {
    if (access_token) {
      const response = await fetch(`${process.env.GET_USER_DATA_PATH}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },

        next: {
          tags: ["userByCookies"],
          revalidate: Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
        },
        signal,
      });

      if (!response?.ok) {
        const errorData: ErrorData = await response.json();

        throw errorData;
      }

      const data: UserFromServer = await response.json();

      return data;
    }

    if (!access_token && refresh_token) {
      return await refreshTokens(refresh_token, fetchUserData);
    }
  } catch (error: unknown) {
    if (isErrorData(error)) {
      return error;
    } else {
      console.log("error", error);
    }
  }
}
