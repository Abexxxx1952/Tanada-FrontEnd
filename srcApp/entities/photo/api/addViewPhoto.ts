"use server";
import { ErrorData } from "@/srcApp/shared/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { PhotoStats } from "@/srcApp/entities/photo/model/types";

export async function addViewPhoto(
  id: number
): Promise<PhotoStats | undefined | ErrorData> {
  try {
    const response = await fetch(`${process.env.ADD_VIEW_PHOTO}/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response?.ok) {
      const errorData: ErrorData = await response.json();

      throw errorData;
    }

    const data: PhotoStats = await response.json();

    return data;
  } catch (error: unknown) {
    if (isErrorData(error)) {
      return error;
    } else {
      console.log("error", error);
    }
  }
}