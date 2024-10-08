"use client";
import { Social } from "@/srcApp/widgets/social";
import { Images } from "@/srcApp/widgets/images";
import { UserFromServer } from "@/srcApp/entities/user/model/types";
import { userDataFromPayload } from "@/srcApp/entities/user/model/userDataFromPayload";
import styles from "./styles.module.css";

type MainPageProps = {
  userId: string | null;
  currentUser: UserFromServer | null;
  owner: boolean;
};

export function MainPage({ userId, currentUser, owner }: MainPageProps) {
  return (
    <>
      <div className={styles.socialContainer}>
        <Social currentUser={currentUser} />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <span className={styles.content__upperText}>A Hiking guide</span>
          <h1 className={styles.content__text}>
            {userDataFromPayload(currentUser, "mainTextContent") ??
              "My adventures anywhere"}
          </h1>
        </div>
      </div>
      <div className={styles.imagesContainer}>
        <Images userId={userId} currentUser={currentUser} owner={owner} />
      </div>
    </>
  );
}
