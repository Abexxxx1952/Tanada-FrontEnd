import { Social } from "../../widgets/social";
import { Content } from "./ui/content";
import { Slider } from "../../widgets/slider";
import { Images } from "../../widgets/images";

import styles from "./styles.module.css";

export function MainPage() {
  return (
    <>
      <div className={styles.socialContainer}>
        <Social />
      </div>
      <div className={styles.contentContainer}>
        <Content />
      </div>
      <div className={styles.sliderContainer}>
        <Slider />
      </div>
      <div className={styles.imagesContainer}>
        <Images />
      </div>
    </>
  );
}
