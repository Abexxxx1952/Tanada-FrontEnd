"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useImperativeDisableScroll } from "@/srcApp/shared/hooks/useImperativeDisableScroll";
import { Button } from "@/srcApp/shared/ui/button";
import { createSignedUrl } from "@/srcApp/entities/photo/api/createSignedUrl";
import { ErrorData, UpdateResult } from "@/srcApp/shared/model/types";
import { uploadPhoto } from "@/srcApp/entities/photo/api/uploadPhoto";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { updatePhotoLink } from "@/srcApp/entities/photo/api/updatePhotoLink";
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
import { UserFromServer } from "@/srcApp/entities/user/model/types";

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
  user: UserFromServer | null;
};

export const ImageUploader = ({
  imageUploadMod,
  currentPhotoId,
  setImageUploadModalOpen,
  setImageUploadMod,
  setImageModificationMod,
  setUpdateLink,
  user,
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
      const updatePhotoResult = await updatePhotoLink(
        currentPhotoId,
        uploadedPhotoUrlResult,
        user?.id
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
      const addPhotoResult = await addPhoto(uploadedPhotoUrlResult, user?.id);

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
    <div
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className={styles.overlay}
        onClick={() => setImageUploadModalOpen(false)}
        role="button"
        tabIndex={0}
        aria-label="Close modal"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setImageUploadModalOpen(false);
          }
        }}
      ></div>

      <div className={styles.content}>
        <h2 className={styles.title} id="modal-title">
          {selectedPhotoBase64 ? "Photo Uploaded" : "Upload photo"}
        </h2>
        <div className={styles.imageUploader}>
          {error && (
            <button className={styles.imageError} onClick={handleInputClick}>
              <Image
                src="icons/image-off.svg"
                alt="No image icon"
                width={80}
                height={80}
                style={{ margin: "auto" }}
              />
            </button>
          )}

          {!selectedPhotoBase64 && (
            <>
              <Image
                src="/icons/image-plus.svg"
                alt="No image"
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
                  role="button"
                  tabIndex={0}
                  aria-label="Browse files"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleInputClick();
                    }
                  }}
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
          <button className={styles.uploadIcon} onClick={handleInputClick}>
            <Image
              src="/icons/upload_2.svg"
              alt="Upload icon"
              fill={true}
              style={{
                objectFit: "contain",
                color: "var(--notFoundBackgroundColor)",
              }}
            />
          </button>
        )}
        <input
          className={styles.fileInput}
          ref={fileInputRef}
          type="file"
          accept="image/*"
          id="picture"
          onChange={handleImageUpload}
          aria-describedby="file-input-description"
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
