"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useImperativeDisableScroll } from "@/srcApp/shared/hooks/useImperativeDisableScroll";
import { Photo } from "@/srcApp/entities/photo/model/types";
import { LoadingPhoto } from "@/srcApp/shared/ui/loadingPhoto";
import {
  ImageModificationMod,
  ImageUploadMod,
} from "@/srcApp/entities/photo/model/types";
import { useKeyboardHandler } from "@/srcApp/shared/hooks/useKeyboardHandler";
import { useImage } from "@/srcApp/shared/hooks/useImage";
import { Moderation } from "../moderation";
import styles from "./styles.module.css";
import { UserFromServer } from "@/srcApp/entities/user/model/types";

type LoginModalProps = {
  photos: Photo[] | null;
  currentPhotoIdx: number | null;
  owner: boolean;
  userId: string | null;
  setCurrentPhotoIdx: React.Dispatch<React.SetStateAction<number | null>>;
  setImageModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setImageUploadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setImageUploadMod: React.Dispatch<
    React.SetStateAction<ImageUploadMod | null>
  >;
  setImageModificationMod: React.Dispatch<
    React.SetStateAction<ImageModificationMod | null>
  >;
};
export function ImageModal({
  photos,
  currentPhotoIdx,
  owner,
  userId,
  setCurrentPhotoIdx,
  setImageModalOpen,
  setImageUploadModalOpen,
  setImageUploadMod,
  setImageModificationMod,
}: LoginModalProps) {
  const [photo, setPhoto] = useState<Photo | null>(null);

  const body = document.querySelector("body");
  useImperativeDisableScroll(body, true);

  useKeyboardHandler(body, [["Escape", () => setImageModalOpen(false)]]);
  useEffect(() => {
    if (photos && photos.length > 0 && currentPhotoIdx !== null) {
      setPhoto(photos[currentPhotoIdx]);
    }
  }, [currentPhotoIdx, photos]);

  const photoUrl = useImage(photo?.link, "/icons/image-off.svg");

  return (
    <div className={styles.modal}>
      <div
        className={styles.overlay}
        onClick={() => setImageModalOpen(false)}
      ></div>

      <div className={styles.content}>
        {photoUrl.isImageLoaded === null && <LoadingPhoto />}
        {photoUrl.isImageLoaded && (
          <Image
            src={photoUrl.imageSrc}
            alt="image"
            fill={true}
            style={{ objectFit: "cover" }}
          />
        )}
        {photoUrl.isImageLoaded === false && (
          <Image
            src={photoUrl.imageSrc}
            alt="no_image"
            width={80}
            height={80}
            style={{ margin: "auto" }}
          />
        )}
        <Moderation
          photos={photos}
          currentPhotoIdx={currentPhotoIdx}
          owner={owner}
          userId={userId}
          viewsCount={photo?.stats.viewsCount}
          setCurrentPhotoIdx={setCurrentPhotoIdx}
          setImageModalOpen={setImageModalOpen}
          setImageUploadModalOpen={setImageUploadModalOpen}
          setImageUploadMod={setImageUploadMod}
          setImageModificationMod={setImageModificationMod}
        />
      </div>
    </div>
  );
}
