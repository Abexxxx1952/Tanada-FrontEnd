"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useImperativeDisableScroll } from "@/srcApp/shared/hooks/useImperativeDisableScroll";
import { Button } from "@/srcApp/shared/ui/button";
import { createSignedUrl } from "@/srcApp/entities/photo/api/createSignedUrl";
import { ErrorData, UpdateResult } from "@/srcApp/shared/model/types";
import { uploadPhoto } from "@/srcApp/entities/photo/api/uploadPhoto";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { updatePhoto } from "@/srcApp/entities/photo/api/updatePhoto";
import { toast } from "react-toastify";
import {
  CreateSignedUrlResponse,
  ImageModificationMod,
  ImageUploadMod,
  Photo,
} from "@/srcApp/entities/photo/model/types";
import { addPhoto } from "@/srcApp/entities/photo/api/addPhoto";
import { useKeyboardHandler } from "@/srcApp/shared/hooks/useKeyboardHandler";
import { notifyResponse } from "@/srcApp/shared/model/notifyResponse";
import styles from "./styles.module.css";
import { revalidateTag } from "next/cache";
import { revalidateCache } from "@/srcApp/shared/model/revalidateCache";

type ImageUploaderProps = {
  imageUploadMod: ImageUploadMod | null;
  currentPhotoId: number;
  setImageUploadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setImageUploadMod: React.Dispatch<
    React.SetStateAction<ImageUploadMod | null>
  >;
  setImageModificationMod: React.Dispatch<
    React.SetStateAction<ImageModificationMod | null>
  >;
  setUpdateLink: React.Dispatch<React.SetStateAction<string | null>>;
};

export const ImageUploader = ({
  imageUploadMod,
  currentPhotoId,
  setImageUploadModalOpen,
  setImageUploadMod,
  setImageModificationMod,
  setUpdateLink,
}: ImageUploaderProps) => {
  const [selectedPhotoBase64, setSelectedPhotoBase64] = useState<string | null>(
    null
  );
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const body = document.querySelector("body");
  useImperativeDisableScroll(body, true);

  useKeyboardHandler(body, [
    ["Escape", () => setImageUploadModalOpen(false)],
    ["Enter", handleUploadButton, [selectedPhoto]],
  ]);

  const handleInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (!file.type.startsWith("image/")) {
        alert("Load image only");
        return;
      }

      setSelectedPhoto(file);
      setError(false);

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setSelectedPhotoBase64(reader.result);
        }
      };

      reader.onerror = () => {
        setError(true);
      };

      reader.readAsDataURL(file);
    }
  };

  async function handleUploadButton() {
    setLoading(true);
    let signedUrlResult: CreateSignedUrlResponse | undefined | ErrorData;
    let uploadedPhotoUrlResult: string | undefined | ErrorData;

    if (selectedPhoto) {
      signedUrlResult = await createSignedUrl(selectedPhoto.name);
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

    if (
      !isErrorData(signedUrlResult) &&
      signedUrlResult !== undefined &&
      selectedPhoto
    ) {
      uploadedPhotoUrlResult = await uploadPhoto(
        signedUrlResult,
        selectedPhoto
      );
      revalidateCache("photo");
      revalidateCache("photoStats");
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

    if (
      imageUploadMod === "update" &&
      !isErrorData(uploadedPhotoUrlResult) &&
      uploadedPhotoUrlResult !== undefined
    ) {
      const updatePhotoResult = await updatePhoto(
        currentPhotoId,
        uploadedPhotoUrlResult
      );

      notifyResponse<UpdateResult>(
        updatePhotoResult,
        `Photo with id: ${currentPhotoId} updated successfully`
      );

      if (!isErrorData(updatePhotoResult) && updatePhotoResult !== undefined) {
        setUpdateLink(uploadedPhotoUrlResult);
        setImageModificationMod("updated");
      }
      setImageUploadMod(null);
      setImageUploadModalOpen(false);
    }
    if (
      imageUploadMod === "add" &&
      !isErrorData(uploadedPhotoUrlResult) &&
      uploadedPhotoUrlResult !== undefined
    ) {
      const addPhotoResult = await addPhoto(uploadedPhotoUrlResult);

      notifyResponse<Photo>(addPhotoResult, "Photo successfully added");

      if (!isErrorData(addPhotoResult) && addPhotoResult !== undefined) {
        setImageModificationMod("added");
      }
      setImageUploadMod(null);
      setImageUploadModalOpen(false);
    }
    setLoading(false);
  }

  return (
    <div className={styles.modal}>
      <div
        className={styles.overlay}
        onClick={() => setImageUploadModalOpen(false)}
      ></div>

      <div className={styles.content}>
        <h2 className={styles.title}>
          {selectedPhotoBase64 ? "Photo Uploaded" : "Upload photo"}
        </h2>
        <div className={styles.imageUploader}>
          {error && (
            <div className={styles.imageError} onClick={handleInputClick}>
              <Image
                src="icons/image-off.svg"
                alt="no_image"
                width={80}
                height={80}
                style={{ margin: "auto" }}
              />
            </div>
          )}

          {!selectedPhotoBase64 && (
            <>
              <Image
                src="/icons/image-plus.svg"
                alt="no_image"
                width={80}
                height={80}
                onClick={handleInputClick}
                style={{ margin: "auto", cursor: "pointer" }}
              />
              <h3 className={styles.dndText}>
                Drag and Drop photo or&nbsp;
                <strong
                  className={styles.strongText}
                  onClick={handleInputClick}
                >
                  <u>Browse</u>
                </strong>
              </h3>
            </>
          )}
          {selectedPhotoBase64 && (
            <Image
              src={selectedPhotoBase64}
              alt="Uploaded image"
              fill={true}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        {selectedPhotoBase64 && (
          <div className={styles.uploadIcon} onClick={handleInputClick}>
            <Image
              src="/icons/upload.svg"
              alt="upload icon"
              fill={true}
              style={{ objectFit: "contain", color: "var(--logoColor)" }}
            />
          </div>
        )}
        <input
          className={styles.fileInput}
          ref={fileInputRef}
          type="file"
          accept="image/*"
          id="picture"
          onChange={handleImageUpload}
        />

        <div className={styles.button}>
          <Button
            onClick={handleUploadButton}
            text="Upload"
            textColor="white"
            backgroundColor="var(--logoColor)"
            focusTextColor="white"
            focusBackgroundColor="var(--buttonLoginBackgroundColor)"
            loading={loading}
            disabled={!selectedPhotoBase64}
          />
        </div>
      </div>
    </div>
  );
};
