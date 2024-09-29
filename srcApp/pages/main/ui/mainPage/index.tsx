"use client";
import { Social } from "@/srcApp/widgets/social";
import { Images } from "@/srcApp/widgets/images";
import { UserFromServer } from "@/srcApp/entities/user/model/types";

import styles from "./styles.module.css";

type MainPageProps = {
  currentUser: UserFromServer | null;
  owner: boolean;
};

export function MainPage({ currentUser, owner }: MainPageProps) {
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
        <Images currentUser={currentUser} owner={owner} />
      </div>
    </>
  );
}
