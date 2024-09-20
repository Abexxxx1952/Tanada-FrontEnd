"use client";
import { PropsWithChildren, useEffect, useRef } from "react";
import { withProviders } from "./providers/index";
import styles from "./styles.module.css";

export type AppType = (props: PropsWithChildren) => JSX.Element;

function App({ children }: PropsWithChildren) {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mainElement = mainRef.current;
    if (mainElement) {
      const children = mainElement.children;
      for (let i = 0; i < children.length; i++) {
        if (children[i].classList.value.startsWith("styles_profileContainer")) {
          mainElement.classList.add(styles.hasProfileContainer);
          break;
        }
      }
    }
  }, []);

  return (
    <main className={styles.main} ref={mainRef}>
      {children}
    </main>
  );
}
export default withProviders(App);
