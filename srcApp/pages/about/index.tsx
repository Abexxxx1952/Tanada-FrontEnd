import styles from "./styles.module.css";
import { About } from "../../widgets/about";

export function AboutPage() {
  return (
    <div className={styles.aboutContainer}>
      <About />
    </div>
  );
}
