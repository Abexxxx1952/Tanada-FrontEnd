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
    <div className={styles.addPhoto} onClick={handleAddPhotoClick}>
      <Image
        src="/icons/circle-plus.svg"
        fill={true}
        style={{ objectFit: "cover", padding: "0.3rem" }}
        alt="circle-plus"
      />
      <div className={styles.tooltip}>
        <Tooltip text="Add new photo" />
      </div>
    </div>
  );
}
