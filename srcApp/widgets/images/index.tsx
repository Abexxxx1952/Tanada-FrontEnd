"use client";
const foto = [
  {
    id: 130,
    link: "/images/1.jpg",
    createdAt: "2023-08-24T19:41:43.078Z",
    updatedAt: "2023-12-07T06:56:42.635Z",
    stats: {
      id: 16,
      created: 1,
      viewsCount: 0,
      deleted: null,
      photoId: 130,
    },
  },
  {
    id: 131,
    link: "/images/2.jpg",
    createdAt: "2023-09-17T20:54:19.138Z",
    updatedAt: "2024-06-15T18:41:04.606Z",
    stats: {
      id: 17,
      created: 1,
      viewsCount: 0,
      deleted: null,
      photoId: 131,
    },
  },
  {
    id: 132,
    link: "/images/3.jpg",
    createdAt: "2024-05-08T03:27:35.896Z",
    updatedAt: "2023-08-30T01:23:44.770Z",
    stats: {
      id: 18,
      created: 1,
      viewsCount: 0,
      deleted: null,
      photoId: 132,
    },
  },
  {
    id: 132,
    link: "/images/4.jpg",
    createdAt: "2024-05-08T03:27:35.896Z",
    updatedAt: "2023-08-30T01:23:44.770Z",
    stats: {
      id: 18,
      created: 1,
      viewsCount: 0,
      deleted: null,
      photoId: 132,
    },
  },
  {
    id: 132,
    link: "/images/5.jpg",
    createdAt: "2024-05-08T03:27:35.896Z",
    updatedAt: "2023-08-30T01:23:44.770Z",
    stats: {
      id: 18,
      created: 1,
      viewsCount: 0,
      deleted: null,
      photoId: 132,
    },
  },
];

import { PhotoBox } from "@/srcApp/entities/photo/ui/photoBox";
import { useEffect, useRef, useState, createRef } from "react";
import { createPortal } from "react-dom";
import { ImageModal } from "../image-modal";
import { Photo } from "@/srcApp/entities/photo/model/types";
import styles from "./styles.module.css";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { toast } from "react-toastify";
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
import { Tooltip } from "@/srcApp/shared/ui/tooltip";

export function Images() {
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [imageUploadModalOpen, setImageUploadModalOpen] =
    useState<boolean>(false);
  const [imageUploadMod, setImageUploadMod] = useState<ImageUploadMod | null>(
    null
  );
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState<number | null>(null);
  const [imageModificationMod, setImageModificationMod] =
    useState<ImageModificationMod | null>(null);
  const [updateLink, setUpdateLink] = useState<string | null>(null);
  const { user } = useAppContext();
  const portalRef = useRef<HTMLElement | null>(null);
  const photoRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);

  if (!photoRefs.current.length && photos !== null) {
    photoRefs.current = photos.map(() => createRef<HTMLDivElement>());
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
      setImageModificationMod(null);
      (async () => {
        await fetchPhotoByUser(user, setPhotos);
      })();
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
            {photos?.map((_, idx) => {
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

      {photos &&
        photos.map((elem, idx) => {
          return (
            <PhotoBox
              key={elem.id}
              ref={photoRefs.current[idx]}
              photo={elem}
              idx={idx}
              setImageModalOpen={setImageModalOpen}
              setImageUploadModalOpen={setImageUploadModalOpen}
              setCurrentPhotoIdx={setCurrentPhotoIdx}
              setImageUploadMod={setImageUploadMod}
              setImageModificationMod={setImageModificationMod}
            />
          );
        })}

      {portalRef.current &&
        imageModalOpen &&
        createPortal(
          <ImageModal
            photos={photos}
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
        photos &&
        currentPhotoIdx !== null &&
        createPortal(
          <ImageUploader
            imageUploadMod={imageUploadMod}
            currentPhotoId={photos[currentPhotoIdx].id}
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
