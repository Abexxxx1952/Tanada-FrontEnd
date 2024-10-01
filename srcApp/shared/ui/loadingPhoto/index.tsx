import styles from "./styles.module.css";

export function LoadingPhoto() {
  return (
    <div
      className={styles.container}
      role="alert"
      aria-live="assertive"
      aria-busy="true"
    >
      <div className={styles.load}>
        <hr />
        <hr />
        <hr />
        <hr />
      </div>
    </div>
  );
}
