"use client";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";
import { Social } from "@/srcApp/widgets/social";
import { Images } from "@/srcApp/widgets/images";
import { permanentRedirect, useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import styles from "./styles.module.css";

export function MainWithOutUserPage() {
  const { currentUser } = useAppContext();
  const router = useRouter();
  useLayoutEffect(() => {
    if (currentUser !== null) {
      permanentRedirect(`/${currentUser.id}`);
    }
  }, []);

  return (
    <>
      <div className={styles.socialContainer}>
        <Social currentUser={currentUser} />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <span className={styles.content__upperText}>A Hiking guide</span>
          <h1 className={styles.content__text}>
            {currentUser && currentUser.payload && currentUser.payload[2]
              ? currentUser.payload[2].value
              : "My adventures in Schonada!"}
          </h1>
        </div>
      </div>
      <div className={styles.imagesContainer}>
        <Images currentUser={null} owner={false} />
      </div>
    </>
  );
}
