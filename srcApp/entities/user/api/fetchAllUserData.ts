"use server";
import { UserFromServer } from "@/srcApp/entities/user/model/types";
import { ErrorData } from "@/srcApp/shared/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";

let controller: AbortController | null = null;
export async function fetchAllUserData(): Promise<
  UserFromServer[] | undefined | ErrorData
> {
  if (controller) {
    controller.abort();
  }

  controller = new AbortController();
  const { signal } = controller;

  try {
    const response = await fetch(`${process.env.GET_ALL_USER_DATA_PATH}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
      next: {
        tags: ["userAll"],
        revalidate: 60 * 15,
      },
      signal,
    });

    if (!response?.ok) {
      const errorData: ErrorData = await response.json();

      throw errorData;
    }

    const data: UserFromServer = await response.json();

    return data;
  } catch (error: unknown) {
    if (isErrorData(error)) {
      return error;
    } else {
      console.log("error", error);
    }
  }
}
