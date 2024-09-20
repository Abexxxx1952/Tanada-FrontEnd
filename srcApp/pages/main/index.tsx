"use client";
import { Social } from "../../widgets/social";
import { Images } from "../../widgets/images";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";
import styles from "./styles.module.css";

export function MainPage() {
  const { user } = useAppContext();
  return (
    <>
      <div className={styles.socialContainer}>
        <Social user={user} />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <span className={styles.content__upperText}>A Hiking guide</span>
          <h1 className={styles.content__text}>
            {user && user.payload && user.payload[2]
              ? user.payload[2].value
              : "My adventures in Schonada!"}
          </h1>
        </div>
      </div>
      <div className={styles.imagesContainer}>
        <Images />
      </div>
    </>
  );
}
