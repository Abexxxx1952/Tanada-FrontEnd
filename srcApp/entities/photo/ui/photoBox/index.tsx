"use client";
import { forwardRef } from "react";
import Image from "next/image";
import { Photo } from "@/srcApp/entities/photo/model/types";
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

type PhotoBoxProps = {
  photo: Photo;
  idx: number;
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

const PhotoBox = forwardRef<HTMLDivElement, PhotoBoxProps>(
  (
    {
      photo,
      idx,
      owner,
      userId,
      setCurrentPhotoIdx,
      setImageModalOpen,
      setImageUploadModalOpen,
      setImageUploadMod,
      setImageModificationMod,
    },
    ref
  ) => {
    const photoUrl = useImage(photo?.link, "/icons/image-off.svg");

    function handleImageClick(event: React.SyntheticEvent<HTMLElement>) {
      setCurrentPhotoIdx(idx);
      setImageModalOpen(true);

      (async function () {
        await addViewPhoto(photo.id, userId);
      })();
    }

    function handleImageUploadClick(event: React.SyntheticEvent<HTMLElement>) {
      event.stopPropagation();
      setCurrentPhotoIdx(idx);
      setImageUploadMod("update");
      setImageUploadModalOpen(true);
    }

    async function handleImageDeleteClick(
      event: React.SyntheticEvent<HTMLElement>
    ) {
      event.stopPropagation();
      const isConfirmed = window.confirm("Are you sure?");
      if (isConfirmed) {
        setCurrentPhotoIdx(idx);
        setImageModificationMod("deleted");
      }
    }

    /* ---------------------- DnD ---------------------- */

    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({
        id: photo.id,
      });

    const style = {
      transform: CSS.Transform.toString(transform),
    };

    /* --------------------------------------------------- */
    console.log("photo", photo);
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
          role="button"
          tabIndex={0}
          aria-label="View photo"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleImageClick(e);
            }
          }}
        >
          {photoUrl.isImageLoaded === null && <LoadingPhoto />}

          <>
            {photoUrl.isImageLoaded && (
              <Image
                src={photoUrl.imageSrc}
                fill={true}
                style={{ objectFit: "cover" }}
                alt="Photo"
                sizes="(max-width: 416px) 70vw, (max-width: 816px) 80vw, (max-width: 1900px) 90vw, 100vw"
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
            <div className={styles.author}>
              <span className={styles.author__avatar}>
                <Image
                  src={photo.user.icon || "/icons/header-account.svg"}
                  fill={true}
                  alt="Avatar icon"
                />
              </span>
              <span className={styles.author__name}>{photo.user.name}</span>
            </div>
            <div className={styles.moderation}>
              <span className={styles.moderation__viewsIcon}>
                <Image src="/icons/eye.svg" fill={true} alt="View icon" />
              </span>

              <span className={styles.moderation__viewsCount}>
                {photo.stats.viewsCount}
              </span>
              {owner && (
                <button
                  className={styles.moderation__upload}
                  onClick={handleImageUploadClick}
                  role="button"
                  tabIndex={0}
                  aria-label="Upload photo"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleImageUploadClick(e);
                    }
                  }}
                >
                  <Image src="/icons/upload_1.svg" fill={true} alt="Upload" />
                </button>
              )}
              {owner && (
                <button
                  className={styles.moderation__delete}
                  onClick={handleImageDeleteClick}
                  role="button"
                  tabIndex={0}
                  aria-label="Delete photo"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleImageDeleteClick(e);
                    }
                  }}
                >
                  <Image src="/icons/delete.svg" fill={true} alt="Delete" />
                </button>
              )}
            </div>
          </>
        </div>
      </div>
    );
  }
);

PhotoBox.displayName = "PhotoBox";

export { PhotoBox };
