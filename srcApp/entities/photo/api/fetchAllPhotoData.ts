"use server";
import { ErrorData } from "@/srcApp/shared/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { Photo } from "@/srcApp/entities/photo/model/types";
import { shuffleArray } from "@/srcApp/shared/model/shuffleArray";

export async function fetchAllPhoto(
  abortControllerRef: React.MutableRefObject<AbortController | null>
): Promise<Photo[] | undefined | ErrorData> {
  if (abortControllerRef.current) {
    abortControllerRef.current.abort();
  }

  abortControllerRef.current = new AbortController();
  const { signal } = abortControllerRef.current;

  try {
    const response = await fetch(`${process.env.GET_ALL_PHOTOS_PATH}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["photoAll"],
      },
      signal,
    });

    if (!response?.ok) {
      const errorData: ErrorData = await response.json();

      throw errorData;
    }

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
