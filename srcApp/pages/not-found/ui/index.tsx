import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";

export function NotFound() {
  return (
    <div
      className={styles.notFoundContainer}
      role="alert"
      aria-live="assertive"
    >
      <div className={styles.notFound}>
        <div className={styles.notFound__left}>
          <h2 className={styles.header}>
            404. <span className={styles.subheader}>No found.</span>
          </h2>
          <span className={styles.text}>
            Woops. Looks like this page does not exist.
          </span>
          <span className={styles.backLink}>
            back to&nbsp;
            <Link href="/" className={styles.link} aria-label="Go back to Home">
              Home
            </Link>
          </span>
        </div>
        <span className={styles.notFound__right}>
          <Image
            src="/images/notFound.png"
            fill={true}
            alt="notFound"
            sizes="(max-width: 412px) 70vw, (max-width: 816px) 80vw, (max-width: 1200px) 90vw, 100vw"
          />
        </span>
      </div>
    </div>
  );
}
