import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";

export function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
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
            <Link href="/" className={styles.link}>
              Home
            </Link>
          </span>
        </div>
        <div className={styles.notFound__right}>
          <Image
            src="/images/notFound.png"
            fill={true}
            alt="notFound"
            sizes="(max-width: 412px) 70vw, (max-width: 816px) 80vw, (max-width: 1200px) 90vw, 100vw"
          />
        </div>
      </div>
    </div>
  );
}
