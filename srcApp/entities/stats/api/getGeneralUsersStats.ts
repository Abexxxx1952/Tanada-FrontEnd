"use server";
import { ErrorData } from "@/srcApp/shared/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { UsersStatsResult } from "../model/types";

export async function getGeneralUsersStats(): Promise<
  UsersStatsResult | ErrorData | undefined
> {
  try {
    const response = await fetch(`${process.env.GET_ALL_USERS_STATS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
       cache: "force-cache",
      next: {
        tags: ["userStats"],
      },
    });

    if (!response.ok) {
      const errorData: ErrorData = await response.json();

      throw errorData;
    }

    const data: UsersStatsResult = await response.json();

    return data;
  } catch (error: unknown) {
    if (isErrorData(error)) {
      return error;
    } else {
      console.log("error", error);
    }
  }
}
