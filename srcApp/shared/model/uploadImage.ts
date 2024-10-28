"use client";
import { createSignedUrl } from "@/srcApp/entities/photo/api/createSignedUrl";
import { CreateSignedUrlResponse } from "@/srcApp/entities/photo/model/types";
import { ErrorData } from "./types";
import { isErrorData } from "./isErrorData";
import { toast } from "react-toastify";
import { uploadPhoto } from "@/srcApp/entities/photo/api/uploadPhoto";

export async function uploadImage(
  file: File | null
): Promise<string | undefined> {
  let signedUrlResult: CreateSignedUrlResponse | undefined | ErrorData;
  let uploadedPhotoUrlResult: string | undefined | ErrorData;

  if (file) {
    signedUrlResult = await createSignedUrl(file.name);
  }

  if (isErrorData(signedUrlResult)) {
    toast.error(
      `Error: ${signedUrlResult.status} ${
        signedUrlResult.statusText
      }. Massage: ${JSON.stringify(signedUrlResult)}`,
      {
        position: "top-right",
      }
    );
  }

  if (!isErrorData(signedUrlResult) && signedUrlResult !== undefined && file) {
    uploadedPhotoUrlResult = await uploadPhoto(signedUrlResult, file);
  }

  if (isErrorData(uploadedPhotoUrlResult)) {
    toast.error(
      `Error: ${uploadedPhotoUrlResult.status} ${
        uploadedPhotoUrlResult.statusText
      }. Massage: ${JSON.stringify(signedUrlResult)}`,
      {
        position: "top-right",
      }
    );
  }
  if (!isErrorData(uploadedPhotoUrlResult)) {
    return uploadedPhotoUrlResult;
  }
}
