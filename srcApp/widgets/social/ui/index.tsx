"use client";
import Link from "next/link";
import { UserFromServer } from "@/srcApp/entities/user/model/types";
import { INSTAGRAM_LINK_BASIC } from "@/srcApp/shared/constants/socialLink-list";
import { TWITTER_LINK_BASIC } from "@/srcApp/shared/constants/socialLink-list";
import { userDataFromPayload } from "@/srcApp/entities/user/model/userDataFromPayload";
import styles from "./styles.module.css";

type SocialProps = {
  currentUser: UserFromServer | null;
};

export function Social({ currentUser }: SocialProps) {
  const INSTAGRAM_LINK =
    userDataFromPayload(currentUser, "instagramUrl") || INSTAGRAM_LINK_BASIC;
  const TWITTER_LINK =
    userDataFromPayload(currentUser, "twitterUrl") || TWITTER_LINK_BASIC;
  return (
    <nav className={styles.social}>
      <div className={styles.social__text}>
        <span>Follow us</span>
      </div>
      <Link href={INSTAGRAM_LINK} className={styles.social__item}>
        <img src="/icons/instagram.svg" alt="Instagram icon" />
      </Link>

      <Link href={TWITTER_LINK} className={styles.social__item}>
        <img src="/icons/twitter.svg" alt="Twitter icon" />
      </Link>
    </nav>
  );
}
