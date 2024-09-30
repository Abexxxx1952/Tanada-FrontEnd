"use client";
import { ErrorData } from "@/srcApp/shared/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import {
  CreateSignedUrlResponse,
  UploadFileResponse,
} from "@/srcApp/entities/photo/model/types";

export async function uploadPhoto(
  data: CreateSignedUrlResponse,
  file: File
): Promise<string | undefined | ErrorData> {
  const url = data.data.signedUrl;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!response.ok) {
      const errorData: ErrorData = await response.json();

      throw errorData;
    }

    const data: UploadFileResponse = await response.json();

    return `${process.env.NEXT_PUBLIC_BUCKET_PREFIX_URL}${data.Key}`;
  } catch (error: unknown) {
    if (isErrorData(error)) {
      return error;
    } else {
      console.log("error", error);
    }
  }
}
