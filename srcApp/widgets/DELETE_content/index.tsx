"use client";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";
import styles from "./styles.module.css";

export function Content() {
  const { user } = useAppContext();
  return (
    <div className={styles.content}>
      <span className={styles.content__upperText}>A Hiking guide</span>
      <h1 className={styles.content__text}>
        {user && user.payload && user.payload[2]
          ? user.payload[2].value
          : "My adventures in Schonada!"}
      </h1>
    </div>
  );
}
