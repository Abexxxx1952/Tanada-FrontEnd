"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";

export function ErrorPage() {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.error}>
        <div className={styles.mainText}>
          <h3 className={styles.mainText__header}>Oops!</h3>
          <span className={styles.mainText__body}>There is no fish</span>
        </div>
        <Image
          src="/images/error.svg"
          fill={true}
          alt="notFound"
          sizes="(max-width: 412px) 70vw, (max-width: 816px) 80vw, (max-width: 1200px) 90vw, 100vw"
        />
        <div className={styles.back}>
          <span className={styles.backText}>
            There are only&nbsp;<strong>ERRORS</strong>&nbsp;
            <span className={styles.backLink}>
              back to&nbsp;
              <Link href="/" className={styles.link}>
                Home
              </Link>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
