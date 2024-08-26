import Link from "next/link";
import { INSTAGRAM_LINK } from "../../shared/constants/socialLink-list";
import { TWITTER_LINK } from "../../shared/constants/socialLink-list";
import styles from "./styles.module.css";

export function Social() {
  return (
    <nav className={styles.social}>
      <div className={styles.social__text}>
        <span>Follow us</span>
      </div>
      <Link href={INSTAGRAM_LINK}>
        <img src="/icons/instagram.svg" alt="Instagram icon" />
      </Link>

      <Link href={TWITTER_LINK}>
        <img src="/icons/twitter.svg" alt="Twitter icon" />
      </Link>
    </nav>
  );
}