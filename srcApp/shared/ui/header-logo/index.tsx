import Link from "next/link";
import styles from "./styles.module.css";

export function Logo() {
  return (
    <Link href="/" className={styles.logo}>
      Sanya Prod<sup>®</sup>
      <img src="/icons/logo.svg" className={styles.logo__icon} alt="Logo" />
    </Link>
  );
}
