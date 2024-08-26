"use server";
import { UserFromServer } from "../../../../entities/user/model/types";
import { ErrorData } from "@/srcApp/features/user/model/types";
import { isErrorData } from "@/srcApp/features/user/lib/isErrorData";
import { HeaderList } from "./../../../../shared/ui/header-list/index";
import { setCookies } from "../../cookies/model/setCookies";

export async function loginUser(
  email: string,
  password: string
): Promise<UserFromServer | undefined | ErrorData> {
  const url: string = process.env.LOGIN_URL || "";

  const requestBody = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData: ErrorData = await response.json();
      throw errorData;
    }

    let [access_token, refresh_token] = response.headers.getSetCookie() || [];

    access_token = access_token.split(";")[0].split("=")[1];
    refresh_token = refresh_token.split(";")[0].split("=")[1];

    await setCookies(access_token, refresh_token);

    const data: UserFromServer = await response.json();

    return data;
  } catch (error) {
    if (isErrorData(error)) {
      return error;
    } else {
      console.log("error", error);
    }
  }
}
