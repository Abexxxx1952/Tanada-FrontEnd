import styles from "./styles.module.css";

export function Content() {
  return (
    <div className={styles.content}>
      <div className={styles.content__upperText}>A Hiking guide</div>
      <div className={styles.content__text}>My adventures in Schonada!</div>
    </div>
  );
}
