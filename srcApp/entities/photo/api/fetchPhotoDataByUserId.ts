"use server";
import { ErrorData } from "@/srcApp/shared/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { Photo } from "@/srcApp/entities/photo/model/types";

export async function fetchAllPhotoByUserId(
  userId: string
): Promise<Photo[] | undefined | ErrorData> {
  try {
    const condition = {
      where: {
        user: {
          id: userId,
        },
      },
      order: {
        id: "ASC",
      },
    };

    const queryParam = encodeURIComponent(JSON.stringify(condition));

    const response = await fetch(
      `${process.env.GET_ALL_PHOTOS_BY_USER_ID_PATH}?condition=${queryParam}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response?.ok) {
      const errorData: ErrorData = await response.json();

      throw errorData;
    }

    const data: Photo[] = await response.json();

    return data;
  } catch (error: unknown) {
    if (isErrorData(error)) {
      return error;
    } else {
      console.log("error", error);
    }
  }
}
