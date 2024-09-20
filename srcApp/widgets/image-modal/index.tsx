"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useImperativeDisableScroll } from "@/srcApp/shared/hooks/useImperativeDisableScroll";
import { Photo } from "@/srcApp/entities/photo/model/types";
import { Loading } from "@/srcApp/shared/ui/loading";
import { addViewPhoto } from "@/srcApp/entities/photo/api/addViewPhoto";
import {
  ImageModificationMod,
  ImageUploadMod,
} from "@/srcApp/entities/photo/model/types";
import styles from "./styles.module.css";
import { useKeyboardHandler } from "@/srcApp/shared/hooks/useKeyboardHandler";
import { useImage } from "@/srcApp/shared/hooks/useImage";

type LoginModalProps = {
  photos: Photo[] | null;
  currentPhotoIdx: number | null;
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

  function handelChangePhoto(
    photos: Photo[] | null,
    currentPhotoIdx: number | null,
    arrow: "left" | "right"
  ) {
    if (currentPhotoIdx !== null && photos && arrow === "left") {
      if (currentPhotoIdx === 0) {
        setCurrentPhotoIdx(photos.length - 1);
        (async () => {
          await addViewPhoto(photos[photos.length - 1].id);
        })();
        return;
      }

      setCurrentPhotoIdx(currentPhotoIdx - 1);
      (async () => {
        await addViewPhoto(photos[currentPhotoIdx - 1].id);
      })();
    }
    if (currentPhotoIdx !== null && photos && arrow === "right") {
      if (currentPhotoIdx === photos.length - 1) {
        setCurrentPhotoIdx(0);
        (async () => {
          await addViewPhoto(photos[0].id);
        })();
        return;
      }

      setCurrentPhotoIdx(currentPhotoIdx + 1);
      (async () => {
        await addViewPhoto(photos[currentPhotoIdx + 1].id);
      })();
    }
  }

  function handleImageUploadClick() {
    setImageUploadMod("update");
    setImageUploadModalOpen(true);
  }

  async function handleImageDeleteClick() {
    const isConfirmed = window.confirm("Are you sure?");
    if (isConfirmed) {
      setImageModificationMod("deleted");
      setImageModalOpen(false);
    }
  }

  return (
    <div className={styles.modal}>
      <div
        className={styles.overlay}
        onClick={() => setImageModalOpen(false)}
      ></div>

      <div className={styles.content}>
        {photoUrl.isImageLoaded === null && <Loading />}
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
        <div className={styles.moderation}>
          <div className={styles.views}>
            <div className={styles.views__icon}>
              <Image src="/icons/eye.svg" fill={true} alt="Eye" />
            </div>
            <div className={styles.views__count}>{photo?.stats.viewsCount}</div>
          </div>

          <div className={styles.arrow}>
            <div
              className={styles.arrow__left}
              onClick={() => handelChangePhoto(photos, currentPhotoIdx, "left")}
            >
              <Image src="/icons/arrow-left.svg" fill={true} alt="Eye" />
            </div>
            <div
              className={styles.arrow__right}
              onClick={() =>
                handelChangePhoto(photos, currentPhotoIdx, "right")
              }
            >
              <Image src="/icons/arrow-right.svg" fill={true} alt="Eye" />
            </div>
          </div>

          <i
            className={styles.moderation__upload}
            onClick={handleImageUploadClick}
          >
            <Image src="/icons/upload.svg" fill={true} alt="upload" />
          </i>
          <i
            className={styles.moderation__delete}
            onClick={handleImageDeleteClick}
          >
            <Image src="/icons/delete.svg" fill={true} alt="delete" />
          </i>
        </div>
      </div>
    </div>
  );
}
