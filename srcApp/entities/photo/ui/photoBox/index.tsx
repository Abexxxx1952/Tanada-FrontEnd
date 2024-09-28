"use client";
import Image from "next/image";
import { Photo } from "../../model/types";
import { forwardRef } from "react";
import { addViewPhoto } from "@/srcApp/entities/photo/api/addViewPhoto";
import {
  ImageModificationMod,
  ImageUploadMod,
} from "@/srcApp/entities/photo/model/types";
import { LoadingPhoto } from "@/srcApp/shared/ui/loadingPhoto";
import { useImage } from "@/srcApp/shared/hooks/useImage";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./styles.module.css";
import { log } from "console";

type PhotoBoxProps = {
  photo: Photo;
  idx: number;
  owner: boolean;
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

const PhotoBox = forwardRef<HTMLDivElement, PhotoBoxProps>(
  (
    {
      photo,
      idx,
      owner,
      setCurrentPhotoIdx,
      setImageModalOpen,
      setImageUploadModalOpen,
      setImageUploadMod,
      setImageModificationMod,
    },
    ref
  ) => {
    const photoUrl = useImage(photo?.link, "/icons/image-off.svg");

    function handleImageClick(event: React.MouseEvent<HTMLElement>) {
      setCurrentPhotoIdx(idx);
      setImageModalOpen(true);

      (async function () {
        await addViewPhoto(photo.id);
      })();
    }

    function handleImageUploadClick(event: React.MouseEvent<HTMLElement>) {
      event.stopPropagation();
      setCurrentPhotoIdx(idx);
      setImageUploadMod("update");
      setImageUploadModalOpen(true);
    }

    async function handleImageDeleteClick(
      event: React.MouseEvent<HTMLElement>
    ) {
      event.stopPropagation();
      const isConfirmed = window.confirm("Are you sure?");
      if (isConfirmed) {
        setCurrentPhotoIdx(idx);
        setImageModificationMod("deleted");
      }
    }

    /*  ----------------- DnD ---------------- */

    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({
        id: photo.id,
      });

    const style = {
      transform: CSS.Transform.toString(transform),
    };

    /*   ---------------------------------------------------------------------- */

    return (
      <div
        className={styles.images__itemContainer}
        id={`${photo.id}`}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <div className={styles.images__substrate}></div>
        <div
          className={styles.images__item}
          ref={ref}
          onClick={handleImageClick}
        >
          {photoUrl.isImageLoaded === null && <LoadingPhoto />}
          {photoUrl.isImageLoaded !== null && (
            <>
              <Image
                src={photoUrl.imageSrc}
                fill={true}
                style={{ objectFit: "cover" }}
                alt="photo"
                sizes="(max-width: 416px) 70vw, (max-width: 816px) 80vw, (max-width: 1900px) 90vw, 100vw"
              />
              <div className={styles.moderation}>
                <i className={styles.moderation__viewsIcon}>
                  <Image src="/icons/eye.svg" fill={true} alt="eye" />
                </i>

                <span className={styles.moderation__viewsCount}>
                  {photo.stats.viewsCount}
                </span>
                {owner && (
                  <i
                    className={styles.moderation__upload}
                    onClick={(event) => {
                      handleImageUploadClick(event);
                    }}
                  >
                    <Image
                      src="/icons/upload.svg"
                      fill={true}
                      alt="upload"
                      style={{ color: "white" }}
                    />
                  </i>
                )}
                {owner && (
                  <i
                    className={styles.moderation__delete}
                    onClick={(event) => {
                      handleImageDeleteClick(event);
                    }}
                  >
                    <Image src="/icons/delete.svg" fill={true} alt="delete" />
                  </i>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
);

PhotoBox.displayName = "PhotoBox";

export { PhotoBox };
