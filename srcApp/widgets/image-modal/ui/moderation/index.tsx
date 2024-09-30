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
  user: UserFromServer | null;
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
  user,
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
          await addViewPhoto(photos[photos.length - 1].id, user?.id);
        })();
        return;
      }

      setCurrentPhotoIdx(currentPhotoIdx - 1);
      (async () => {
        await addViewPhoto(photos[currentPhotoIdx - 1].id, user?.id);
      })();
    }
    if (currentPhotoIdx !== null && photos && arrow === "right") {
      if (currentPhotoIdx === photos.length - 1) {
        setCurrentPhotoIdx(0);
        (async () => {
          await addViewPhoto(photos[0].id, user?.id);
        })();
        return;
      }

      setCurrentPhotoIdx(currentPhotoIdx + 1);
      (async () => {
        await addViewPhoto(photos[currentPhotoIdx + 1].id, user?.id);
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
        <div className={styles.views__icon}>
          <Image src="/icons/eye.svg" fill={true} alt="Eye" />
        </div>
        <div className={styles.views__count}>{viewsCount}</div>
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
          onClick={() => handelChangePhoto(photos, currentPhotoIdx, "right")}
        >
          <Image src="/icons/arrow-right.svg" fill={true} alt="Eye" />
        </div>
      </div>

      {owner && (
        <i
          className={styles.moderation__upload}
          onClick={handleImageUploadClick}
        >
          <Image src="/icons/upload.svg" fill={true} alt="upload" />
        </i>
      )}
      {owner && (
        <i
          className={styles.moderation__delete}
          onClick={handleImageDeleteClick}
        >
          <Image src="/icons/delete.svg" fill={true} alt="delete" />
        </i>
      )}
    </div>
  );
}
