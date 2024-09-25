"use server";
import { ErrorData } from "@/srcApp/shared/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { Photo } from "@/srcApp/entities/photo/model/types";
import { shuffleArray } from "@/srcApp/shared/model/shuffleArray";
import { revalidateTag } from "next/cache";

let controller: AbortController | null = null;

export async function fetchAllPhoto(): Promise<
  Photo[] | undefined | ErrorData
> {
  if (controller) {
    controller.abort();
  }

  controller = new AbortController();
  const { signal } = controller;

  try {
    const response = await fetch(`${process.env.GET_ALL_PHOTOS_PATH}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
      next: {
        tags: ["photoAll"],
      },
      signal,
    });

    if (!response?.ok) {
      const errorData: ErrorData = await response.json();

      throw errorData;
    }

    revalidateTag("photoById");
    const data: Photo[] = await response.json();

    return shuffleArray(data);
  } catch (error: unknown) {
    if (isErrorData(error)) {
      return error;
    } else {
      console.log("error", error);
    }
  }
}
