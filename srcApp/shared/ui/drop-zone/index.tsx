import Image from "next/image";
import styles from "./styles.module.css";
import { forwardRef, useRef, useState } from "react";

type DropZoneProps = {
  selectedPhotoBase64: string | null;
  setSelectedPhotoBase64: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedPhoto: React.Dispatch<React.SetStateAction<File | null>>;
  handleInputClick: () => void;
  id: string;
};

const DropZone = forwardRef<HTMLInputElement, DropZoneProps>(
  (
    {
      selectedPhotoBase64,
      setSelectedPhotoBase64,
      setSelectedPhoto,
      handleInputClick,
      id,
    },
    fileInputRef
  ) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [error, setError] = useState<boolean>(false);

    function imageUpload(file: File) {
      if (!file.type.startsWith("image/")) {
        alert("Load image only");
        return;
      }

      setSelectedPhoto(file);
      setError(false);

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setSelectedPhotoBase64(reader.result);
        }
      };

      reader.onerror = () => {
        setError(true);
      };

      reader.readAsDataURL(file);
    }

    function handleUploadIconClick(event: React.ChangeEvent<HTMLInputElement>) {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        imageUpload(file);
      }
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const files = event.dataTransfer?.files;
      if (files.length > 0) {
        const file = files[0];

        imageUpload(file);
      }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragOver(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragOver(false);
    };

    return (
      <div
        id={id}
        className={`${styles.imageUploader} ${
          isDragOver ? styles.dropZoneActive : ""
        } ${selectedPhotoBase64 ? styles.imageUploader_off : ""} `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {error && (
          <button
            className={`${styles.imageError} ${styles.imageContainer}`}
            onClick={handleInputClick}
          >
            <Image
              src="icons/image-off.svg"
              alt="No image icon"
              width={80}
              height={80}
              style={{ margin: "auto" }}
            />
          </button>
        )}

        {!selectedPhotoBase64 && (
          <>
            <span className={styles.imageContainer} onClick={handleInputClick}>
              <Image
                src="/icons/image-plus.svg"
                alt="No image"
                fill={true}
                style={{ margin: "auto", cursor: "pointer" }}
              />
            </span>
            <h3 className={styles.dndText}>
              Drag and Drop photo or&nbsp;
              <strong
                className={styles.strongText}
                onClick={handleInputClick}
                role="button"
                tabIndex={0}
                aria-label="Browse files"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleInputClick();
                  }
                }}
              >
                <u>Browse</u>
              </strong>
            </h3>
          </>
        )}
        {selectedPhotoBase64 && (
          <Image
            src={selectedPhotoBase64}
            alt="Uploaded image"
            fill={true}
            style={{ objectFit: "cover" }}
          />
        )}
        <input
          className={styles.fileInput}
          ref={fileInputRef}
          type="file"
          accept="image/*"
          id="picture"
          onChange={handleUploadIconClick}
          aria-describedby="file-input-description"
        />
      </div>
    );
  }
);

DropZone.displayName = "DropZone";

export { DropZone };
