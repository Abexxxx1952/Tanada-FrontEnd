import styles from "./styles.module.css";

export function Slider() {
  return (
    <nav className={styles.slider}>
      <div className={styles.slider__text}>
        {Array(9)
          .fill(1)
          .map((elem, idx) => {
            return (
              <div className={styles.slider__content} key={idx}>
                {idx + 1}
              </div>
            );
          })}
      </div>
      <div className={styles.slider__line}></div>
    </nav>
  );
}
