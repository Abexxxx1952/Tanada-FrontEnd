"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import { ImageUploadMod } from "../../model/types";
import { Tooltip } from "@/srcApp/shared/ui/tooltip";

type AddPhotoProps = {
  setImageUploadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setImageUploadMod: React.Dispatch<
    React.SetStateAction<ImageUploadMod | null>
  >;
  setCurrentPhotoIdx: React.Dispatch<React.SetStateAction<number | null>>;
};

export function AddPhoto({
  setImageUploadMod,
  setImageUploadModalOpen,
  setCurrentPhotoIdx,
}: AddPhotoProps) {
  function handleAddPhotoClick() {
    setCurrentPhotoIdx(0);
    setImageUploadMod("add");
    setImageUploadModalOpen(true);
  }

  return (
    <div
      className={styles.addPhoto}
      onClick={handleAddPhotoClick}
      role="button"
      tabIndex={0}
      aria-label="Add new photo"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleAddPhotoClick();
        }
      }}
    >
      <span className={styles.addPhoto__image}>
        <Image src="/icons/circle-plus.svg" fill={true} alt="Add photo" />
      </span>

      <div className={styles.tooltip} onClick={handleAddPhotoClick}>
        <Tooltip text="Add new photo" />
      </div>
    </div>
  );
}
