"use server";
import { ErrorData } from "@/srcApp/shared/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { Photo } from "@/srcApp/entities/photo/model/types";

let controller: AbortController | null = null;

export async function fetchAllPhotoByUserId(
  userId: string
): Promise<Photo[] | undefined | ErrorData> {
  if (controller) {
    controller.abort();
  }

  controller = new AbortController();
  const { signal } = controller;

  try {
    const condition = {
      where: {
        user: {
          id: userId,
        },
      },
      order: {
        sortId: "ASC",
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
        cache: "force-cache",
        next: {
          tags: [`photoById${userId}`],
        },
        signal,
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
