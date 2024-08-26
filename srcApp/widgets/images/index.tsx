const foto = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
  "/images/6.jpg",
  "/images/7.jpg",
];

import Image from "next/image";
import styles from "./styles.module.css";

export function Images() {
  return (
    <>
      {foto.map((elem) => {
        return (
          <div className={styles.images__item} key={elem}>
            <Image
              src={elem}
              width={550}
              height={550}
              alt="Photo"
              sizes="(max-width: 416px) 70vw, (max-width: 816px) 80vw, (max-width: 1900px) 90vw, 100vw"
            />
          </div>
        );
      })}
    </>
  );
}
