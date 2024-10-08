import Image from "next/image";
import styles from "./styles.module.css";

type UploadIconProps = {
  handleInputClick: () => void;
};

export function UploadIcon({ handleInputClick }: UploadIconProps) {
  return (
    <button className={styles.uploadIcon} onClick={handleInputClick}>
      <Image
        src="/icons/upload_2.svg"
        alt="Upload icon"
        fill={true}
        style={{
          objectFit: "contain",
          color: "var(--notFoundBackgroundColor)",
        }}
      />
    </button>
  );
}
