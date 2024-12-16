import { PhotoBox } from "@/srcApp/entities/photo/ui/photoBox";
import { useEffect, useRef, useState, createRef } from "react";
import { createPortal } from "react-dom";
import { ImageModal } from "@/srcApp/widgets/image-modal";
import { Photo } from "@/srcApp/entities/photo/model/types";
import { ImageUploader } from "@/srcApp/widgets/image-uploader";
import { AddPhoto } from "@/srcApp/entities/photo/ui/addPhoto";
import {
  ImageModificationMod,
  ImageUploadMod,
} from "@/srcApp/entities/photo/model/types";
import { fetchPhotoByUser } from "@/srcApp/entities/photo/model/fetchPhotoByUser";
import { deletePhoto } from "@/srcApp/entities/photo/api/deletePhoto";
import { notifyResponse } from "@/srcApp/shared/model/notifyResponse";
import {
  addStep,
  initialMaxCount,
} from "@/srcApp/shared/constants/lazyScrollParams";
import { useLazyScrollLoading } from "@/srcApp/shared/hooks/useLazyScrollLoading";
import { UserFromServer } from "@/srcApp/entities/user/model/types";
import { DragAndDropContext } from "@/srcApp/app/providers/dndContext";
import styles from "./styles.module.css";

type ImagesProps = {
  userId: string | null;
  currentUser: UserFromServer | null;
  owner: boolean;
};

export function Images({ userId, currentUser, owner }: ImagesProps) {
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [imageUploadModalOpen, setImageUploadModalOpen] =
    useState<boolean>(false);
  const [imageUploadMod, setImageUploadMod] = useState<ImageUploadMod | null>(
    null
  );
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [photosSliced, setPhotosSliced] = useState<Photo[] | []>([]);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState<number | null>(null);
  const [imageModificationMod, setImageModificationMod] =
    useState<ImageModificationMod | null>(null);
  const [updateLink, setUpdateLink] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const portalRef = useRef<HTMLElement | null>(null);
  const photoRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);

  if (photosSliced !== null) {
    photoRefs.current = photosSliced.map(() => createRef<HTMLDivElement>());
  }

  const maxCount = useLazyScrollLoading(
    initialMaxCount,
    photos?.length || 0,
    addStep,
    photoRefs.current[photoRefs.current.length - 1]
  );

  useEffect(() => {
    portalRef.current = document.getElementById("portal");
  }, []);

  useEffect(() => {
    (async function () {
      await fetchPhotoByUser(currentUser, setPhotos, abortControllerRef);
    })();
    return () => {
      abortControllerRef.current?.abort();
    };
  }, [currentUser]);

  useEffect(() => {
    if (
      imageModificationMod === "deleted" &&
      currentPhotoIdx !== null &&
      photos !== null
    ) {
      (async function () {
        const deletedResult = await deletePhoto(
          photos[currentPhotoIdx].id,
          userId
        );
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
      (async function () {
        await fetchPhotoByUser(currentUser, setPhotos, abortControllerRef);
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
  /*  ----------------- Slider ---------------- */
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
  /*  --------------------------------------- */
  return (
    <>
      <div className={styles.sliderContainer}>
        <nav
          className={styles.slider}
          role="navigation"
          aria-label="Slider navigation"
        >
          <div className={styles.slider__text}>
            {photosSliced?.map((_, idx) => {
              return (
                <div
                  className={styles.slider__content}
                  key={idx}
                  onClick={() => handleSliderClick(idx)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Go to slide ${idx + 1}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleSliderClick(idx);
                    }
                  }}
                >
                  {idx + 1}
                </div>
              );
            })}
          </div>
          <div className={styles.slider__line}></div>
        </nav>
        <div className={styles.addButton}>
          {owner && (
            <AddPhoto
              setImageUploadMod={setImageUploadMod}
              setImageUploadModalOpen={setImageUploadModalOpen}
              setCurrentPhotoIdx={setCurrentPhotoIdx}
            />
          )}
        </div>
      </div>
      {owner ? (
        <DragAndDropContext
          photos={photos}
          photosSliced={photosSliced}
          setPhotos={setPhotos}
          userId={userId}
        >
          {photosSliced &&
            photosSliced.map((elem, idx) => {
              return (
                <PhotoBox
                  key={elem.id}
                  ref={photoRefs.current[idx]}
                  photo={elem}
                  idx={idx}
                  owner={owner}
                  userId={userId}
                  setImageModalOpen={setImageModalOpen}
                  setImageUploadModalOpen={setImageUploadModalOpen}
                  setCurrentPhotoIdx={setCurrentPhotoIdx}
                  setImageUploadMod={setImageUploadMod}
                  setImageModificationMod={setImageModificationMod}
                />
              );
            })}
        </DragAndDropContext>
      ) : (
        photosSliced?.map((elem, idx) => (
          <PhotoBox
            key={elem.id}
            ref={photoRefs.current[idx]}
            photo={elem}
            idx={idx}
            owner={owner}
            userId={userId}
            setImageModalOpen={setImageModalOpen}
            setImageUploadModalOpen={setImageUploadModalOpen}
            setCurrentPhotoIdx={setCurrentPhotoIdx}
            setImageUploadMod={setImageUploadMod}
            setImageModificationMod={setImageModificationMod}
          />
        ))
      )}
      {portalRef.current &&
        imageModalOpen &&
        createPortal(
          <ImageModal
            photos={photosSliced}
            currentPhotoIdx={currentPhotoIdx}
            owner={owner}
            userId={userId}
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
            currentPhotoId={photosSliced[currentPhotoIdx]?.id}
            setImageUploadModalOpen={setImageUploadModalOpen}
            setImageUploadMod={setImageUploadMod}
            setImageModificationMod={setImageModificationMod}
            setUpdateLink={setUpdateLink}
            userId={userId}
          />,
          portalRef.current
        )}
    </>
  );
}
