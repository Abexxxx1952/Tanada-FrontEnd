import { Parallax } from "react-scroll-parallax";
import { useState, type PropsWithChildren } from "react";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingSite } from "@/srcApp/shared/ui/loadingSite";
import styles from "./styles.module.css";

export function BaseLayout({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleImageLoadComplete = () => {
    setIsLoading(false);
  };
  return (
    <body className={styles.body} id="portal" aria-live="polite">
      <ToastContainer autoClose={8000} />
      {isLoading && (
        <div className={styles.loadingIndicator} role="alert" aria-busy="true">
          <LoadingSite />
        </div>
      )}
      <section className={styles.bgContainer}>
        <span className={styles.bgContainer__hg}>
          <Image
            src="/images/HG.png"
            width={1920}
            height={800}
            alt="Hight Ground"
            sizes="(max-width: 412px) 70vw, (max-width: 816px) 80vw, (max-width: 1200px) 90vw, 100vw"
            priority={true}
            onLoad={handleImageLoadComplete}
          />
        </span>

        <div className={styles.bgContainer__upperGradient} />
        <Parallax translateY={[0, 50]} scale={[1, 1.4]}>
          <span className={styles.bgContainer__mg}>
            <Image
              src="/images/MG.png"
              width={1920}
              height={500}
              alt="Middle Ground"
              sizes="(max-width: 412px) 70vw, (max-width: 816px) 80vw, (max-width: 1200px) 90vw, 100vw"
              priority={true}
              onLoad={handleImageLoadComplete}
            />
          </span>
        </Parallax>
        <Parallax translateY={[0, -40]}>
          <span className={styles.bgContainer__vg}>
            <Image
              src="/images/VG.png"
              width={1920}
              height={700}
              alt="Low Ground"
              sizes="(max-width: 412px) 70vw, (max-width: 816px) 80vw, (max-width: 1200px) 90vw, 100vw"
              priority={true}
              onLoad={handleImageLoadComplete}
            />
          </span>
        </Parallax>
        <div className={styles.bgContainer__downGradient} />
      </section>

      {children}
    </body>
  );
}
