import { Photo } from "@/srcApp/entities/photo/model/types";
import styles from "./styles.module.css";

type SliderProps = {
  photos: Photo[] | null;
  photoRefs: React.RefObject<Array<React.RefObject<HTMLDivElement>>>;
};

export function Slider({ photos, photoRefs }: SliderProps) {
  const handleClick = (idx: number) => {
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
    <nav className={styles.slider}>
      <div className={styles.slider__text}>
        {photos?.map((elem, idx) => {
          return (
            <div
              className={styles.slider__content}
              key={idx}
              onClick={() => handleClick(idx)}
            >
              {idx + 1}
            </div>
          );
        })}
      </div>
      <div className={styles.slider__line}></div>
    </nav>
  );
}
