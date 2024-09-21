"use client";
import { PhotoBox } from "@/srcApp/entities/photo/ui/photoBox";
import { useEffect, useRef, useState, createRef } from "react";
import { createPortal } from "react-dom";
import { ImageModal } from "../image-modal";
import { Photo } from "@/srcApp/entities/photo/model/types";
import styles from "./styles.module.css";
import { ImageUploader } from "../image-uploader";
import { AddPhoto } from "@/srcApp/entities/photo/ui/addPhoto";
import {
  ImageModificationMod,
  ImageUploadMod,
} from "@/srcApp/entities/photo/model/types";
import { fetchPhotoByUser } from "@/srcApp/entities/photo/api/fetchPhotoByUser";
import { deletePhoto } from "@/srcApp/entities/photo/api/deletePhoto";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";
import { notifyResponse } from "@/srcApp/shared/model/notifyResponse";
import {
  addStep,
  initialMaxCount,
} from "@/srcApp/shared/constants/lazyScrollParams";
import { useLazyScrollLoading } from "@/srcApp/shared/hooks/useLazyScrollLoading";

export function Images() {
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [imageUploadModalOpen, setImageUploadModalOpen] =
    useState<boolean>(false);
  const [imageUploadMod, setImageUploadMod] = useState<ImageUploadMod | null>(
    null
  );
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [photosSliced, setPhotosSliced] = useState<Photo[] | null>(null);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState<number | null>(null);
  const [imageModificationMod, setImageModificationMod] =
    useState<ImageModificationMod | null>(null);
  const [updateLink, setUpdateLink] = useState<string | null>(null);
  const { user } = useAppContext();
  const portalRef = useRef<HTMLElement | null>(null);
  const photoRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);

  const [refContainer, maxCount] = useLazyScrollLoading(
    initialMaxCount,
    photos?.length || 0,
    addStep
  );

  if (!photoRefs.current.length && photosSliced !== null) {
    photoRefs.current = photosSliced.map(() => createRef<HTMLDivElement>());
  }

  useEffect(() => {
    portalRef.current = document.getElementById("portal");
    (async () => {
      await fetchPhotoByUser(user, setPhotos);
    })();
  }, [user]);

  useEffect(() => {
    if (
      imageModificationMod === "deleted" &&
      currentPhotoIdx !== null &&
      photos !== null
    ) {
      (async () => {
        const deletedResult = await deletePhoto(photos[currentPhotoIdx].id);
        notifyResponse<Photo>(
          deletedResult,
          `Photo with id: ${photos[currentPhotoIdx].id} deleted successfully`
        );
      })();

      const newPhotos = [
        ...photos.slice(0, currentPhotoIdx),
        ...photos.slice(currentPhotoIdx + 1),
      ];
      setPhotos(newPhotos);
      setCurrentPhotoIdx(null);
      setImageModificationMod(null);
    }
    if (imageModificationMod === "added") {
      (async () => {
        await fetchPhotoByUser(user, setPhotos);
      })();
      setImageModificationMod(null);
    }
    if (
      imageModificationMod === "updated" &&
      photos !== null &&
      currentPhotoIdx !== null &&
      updateLink !== null
    ) {
      setImageModificationMod(null);
      const newPhotos = [...photos];
      newPhotos[currentPhotoIdx].link = updateLink;
      setUpdateLink(null);
      setCurrentPhotoIdx(null);
      setPhotos(newPhotos);
    }
  }, [imageModificationMod]);

  useEffect(() => {
    if (photos) {
      setPhotosSliced(photos.slice(0, maxCount));
    }
  }, [maxCount, photos]);

  const handleSliderClick = (idx: number) => {
    if (
      photoRefs.current &&
      photoRefs.current[idx] &&
      photoRefs.current[idx].current
    ) {
      photoRefs.current[idx].current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <>
      <div className={styles.sliderContainer}>
        <nav className={styles.slider}>
          <div className={styles.slider__text}>
            {photosSliced?.map((_, idx) => {
              return (
                <div
                  className={styles.slider__content}
                  key={idx}
                  onClick={() => handleSliderClick(idx)}
                >
                  {idx + 1}
                </div>
              );
            })}
          </div>
          <div className={styles.slider__line}></div>
        </nav>
        <div className={styles.addButton}>
          <AddPhoto
            setImageUploadMod={setImageUploadMod}
            setImageUploadModalOpen={setImageUploadModalOpen}
            setCurrentPhotoIdx={setCurrentPhotoIdx}
          />
        </div>
      </div>

      {photosSliced &&
        photosSliced.map((elem, idx) => {
          return (
            <div
              key={elem.id}
              ref={idx === photosSliced.length - 1 ? refContainer : null}
            >
              <PhotoBox
                ref={photoRefs.current[idx]}
                photo={elem}
                idx={idx}
                setImageModalOpen={setImageModalOpen}
                setImageUploadModalOpen={setImageUploadModalOpen}
                setCurrentPhotoIdx={setCurrentPhotoIdx}
                setImageUploadMod={setImageUploadMod}
                setImageModificationMod={setImageModificationMod}
              />
            </div>
          );
        })}

      {portalRef.current &&
        imageModalOpen &&
        createPortal(
          <ImageModal
            photos={photosSliced}
            currentPhotoIdx={currentPhotoIdx}
            setCurrentPhotoIdx={setCurrentPhotoIdx}
            setImageModalOpen={setImageModalOpen}
            setImageUploadModalOpen={setImageUploadModalOpen}
            setImageUploadMod={setImageUploadMod}
            setImageModificationMod={setImageModificationMod}
          />,
          portalRef.current
        )}
      {portalRef.current &&
        imageUploadModalOpen &&
        photosSliced &&
        currentPhotoIdx !== null &&
        createPortal(
          <ImageUploader
            imageUploadMod={imageUploadMod}
            currentPhotoId={photosSliced[currentPhotoIdx].id}
            setImageUploadModalOpen={setImageUploadModalOpen}
            setImageUploadMod={setImageUploadMod}
            setImageModificationMod={setImageModificationMod}
            setUpdateLink={setUpdateLink}
          />,
          portalRef.current
        )}
    </>
  );
}
