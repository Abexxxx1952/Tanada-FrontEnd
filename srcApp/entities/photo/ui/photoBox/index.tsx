import Image from "next/image";
import styles from "./styles.module.css";
import { Photo } from "../../model/types";
import { forwardRef } from "react";
import { addViewPhoto } from "@/srcApp/entities/photo/api/addViewPhoto";
import {
  ImageModificationMod,
  ImageUploadMod,
} from "@/srcApp/entities/photo/model/types";

import { useIcon } from "@/srcApp/shared/hooks/useIcon";
import { Loading } from "@/srcApp/shared/ui/loading";
import { useImage } from "@/srcApp/shared/hooks/useImage";

type PhotoBoxProps = {
  photo: Photo;
  idx: number;
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
      setCurrentPhotoIdx,
      setImageModalOpen,
      setImageUploadModalOpen,
      setImageUploadMod,
      setImageModificationMod,
    },
    ref
  ) => {
    const photoUrl = useImage(photo?.link, "/icons/image-off.svg");

    function handleImageClick() {
      setCurrentPhotoIdx(idx);
      setImageModalOpen(true);

      (async () => {
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

    return (
      <div className={styles.images__itemContainer} ref={ref}>
        <div className={styles.images__substrate}></div>
        <div className={styles.images__item} onClick={handleImageClick}>
          {photoUrl.isImageLoaded === null && <Loading />}
          {photoUrl.isImageLoaded !== null && (
            <>
              {" "}
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
                <i
                  className={styles.moderation__delete}
                  onClick={(event) => {
                    handleImageDeleteClick(event);
                  }}
                >
                  <Image src="/icons/delete.svg" fill={true} alt="delete" />
                </i>
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