"use client";
import Image from "next/image";
import { Photo } from "@/srcApp/entities/photo/model/types";
import { addViewPhoto } from "@/srcApp/entities/photo/api/addViewPhoto";
import {
  ImageModificationMod,
  ImageUploadMod,
} from "@/srcApp/entities/photo/model/types";
import styles from "./styles.module.css";
import { UserFromServer } from "@/srcApp/entities/user/model/types";

type ModerationProps = {
  photos: Photo[] | null;
  currentPhotoIdx: number | null;
  owner: boolean;
  userId: string | null;
  viewsCount: number | undefined;
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
export function Moderation({
  photos,
  currentPhotoIdx,
  owner,
  userId,
  viewsCount,
  setCurrentPhotoIdx,
  setImageModalOpen,
  setImageUploadModalOpen,
  setImageUploadMod,
  setImageModificationMod,
}: ModerationProps) {
  function handelChangePhoto(
    photos: Photo[] | null,
    currentPhotoIdx: number | null,
    arrow: "left" | "right"
  ) {
    if (currentPhotoIdx !== null && photos && arrow === "left") {
      if (currentPhotoIdx === 0) {
        setCurrentPhotoIdx(photos.length - 1);
        (async () => {
          await addViewPhoto(photos[photos.length - 1].id, userId);
        })();
        return;
      }

      setCurrentPhotoIdx(currentPhotoIdx - 1);
      (async () => {
        await addViewPhoto(photos[currentPhotoIdx - 1].id, userId);
      })();
    }
    if (currentPhotoIdx !== null && photos && arrow === "right") {
      if (currentPhotoIdx === photos.length - 1) {
        setCurrentPhotoIdx(0);
        (async () => {
          await addViewPhoto(photos[0].id, userId);
        })();
        return;
      }

      setCurrentPhotoIdx(currentPhotoIdx + 1);
      (async () => {
        await addViewPhoto(photos[currentPhotoIdx + 1].id, userId);
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
    <div className={styles.moderation}>
      <div className={styles.views}>
        <span className={styles.views__icon}>
          <Image src="/icons/eye.svg" fill={true} alt="Eye" />
        </span>
        <div className={styles.views__count}>{viewsCount}</div>
      </div>

      <div className={styles.arrow}>
        <button
          className={styles.arrow__left}
          onClick={() => handelChangePhoto(photos, currentPhotoIdx, "left")}
          tabIndex={0}
          aria-label="Previous photo"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handelChangePhoto(photos, currentPhotoIdx, "left");
            }
          }}
        >
          <Image src="/icons/arrow-left.svg" fill={true} alt="Previous photo" />
        </button>
        <button
          className={styles.arrow__right}
          onClick={() => handelChangePhoto(photos, currentPhotoIdx, "right")}
          tabIndex={0}
          aria-label="Next photo"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handelChangePhoto(photos, currentPhotoIdx, "right");
            }
          }}
        >
          <Image src="/icons/arrow-right.svg" fill={true} alt="Next photo" />
        </button>
      </div>

      {owner && (
        <button
          className={styles.moderation__upload}
          onClick={handleImageUploadClick}
          tabIndex={0}
          aria-label="Upload photo"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleImageUploadClick();
            }
          }}
        >
          <Image src="/icons/upload_1.svg" fill={true} alt="Upload photo" />
        </button>
      )}
      {owner && (
        <button
          className={styles.moderation__delete}
          onClick={handleImageDeleteClick}
          tabIndex={0}
          aria-label="Delete photo"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleImageDeleteClick();
            }
          }}
        >
          <Image src="/icons/delete.svg" fill={true} alt="Delete photo" />
        </button>
      )}
    </div>
  );
}
