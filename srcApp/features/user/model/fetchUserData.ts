"use server";
import { UserFromServer } from "@/srcApp/entities/user/model/types";
import { ErrorData } from "./types";
import { isErrorData } from "../lib/isErrorData";
import { getCookies } from "../../auth/cookies/model/getCookies";
import { refreshTokens } from "../../auth/refresh-tokens/model/refresh-tokens";

export async function fetchUserData(): Promise<
  UserFromServer | undefined | ErrorData
> {
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
