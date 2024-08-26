"use server";
import { UserFromServer } from "../../../../entities/user/model/types";
import { ErrorData } from "@/srcApp/features/user/model/types";
import { isErrorData } from "@/srcApp/features/user/lib/isErrorData";

export async function registerUser(
  email: string,
  password: string
): Promise<UserFromServer | undefined | ErrorData> {
  const url: string = process.env.REGISTRATION_URL || "";

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
