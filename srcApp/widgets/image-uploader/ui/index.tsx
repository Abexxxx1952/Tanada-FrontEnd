"use client";
import React, { useRef, useState } from "react";
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
import { DropZone } from "@/srcApp/shared/ui/drop-zone";
import { UploadIcon } from "@/srcApp/shared/ui/upload-icon";
import { uploadImage } from "@/srcApp/shared/model/uploadImage";
import styles from "./styles.module.css";

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
  userId: string | null;
};

export const ImageUploader = ({
  imageUploadMod,
  currentPhotoId,
  setImageUploadModalOpen,
  setImageUploadMod,
  setImageModificationMod,
  setUpdateLink,
  userId,
}: ImageUploaderProps) => {
  const [selectedPhotoBase64, setSelectedPhotoBase64] = useState<string | null>(
    null
  );
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  async function handleUploadButton() {
    setLoading(true);
    const uploadedPhotoUrl = await uploadImage(selectedPhoto);

    if (imageUploadMod === "update" && uploadedPhotoUrl !== undefined) {
      const updatePhotoResult = await updatePhotoLink(
        currentPhotoId,
        uploadedPhotoUrl,
        userId
      );

      notifyResponse<UpdateResult>(
        updatePhotoResult,
        `Photo with id: ${currentPhotoId} updated successfully`
      );

      if (updatePhotoResult !== undefined) {
        setUpdateLink(uploadedPhotoUrl);
        setImageModificationMod("updated");
      }
      setImageUploadMod(null);
      setImageUploadModalOpen(false);
    }
    if (imageUploadMod === "add" && uploadedPhotoUrl !== undefined) {
      const addPhotoResult = await addPhoto(uploadedPhotoUrl, userId);

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
        <div className={styles.imageUploaderContainer}>
          <DropZone
            selectedPhotoBase64={selectedPhotoBase64}
            setSelectedPhotoBase64={setSelectedPhotoBase64}
            setSelectedPhoto={setSelectedPhoto}
            handleInputClick={handleInputClick}
            ref={fileInputRef}
            id={"image-uploader"}
          />
        </div>

        {selectedPhotoBase64 && (
          <div className={styles.uploadIconContainer}>
            <UploadIcon handleInputClick={handleInputClick} />
          </div>
        )}

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
