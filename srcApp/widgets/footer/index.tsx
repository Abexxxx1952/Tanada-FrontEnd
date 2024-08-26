import Link from "next/link";
import { FOOTER_ITEMS } from "../../shared/constants/footer-list";
import { Logo } from "../../shared/ui/header-logo";
import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.footerContainer}>
        <div className={styles.footer__colum}>
          <div className={styles.footer__logo}>
            <Logo />
          </div>

          <div className={styles.footer__text}>
            Get out there & discover your next slope, mountain & destination!
          </div>
        </div>
        <div className={styles.footer__colum}>
          {FOOTER_ITEMS.slice(0, Math.floor(FOOTER_ITEMS.length / 2)).map(
            (elem) => {
              if (elem.type === "title") {
                return (
                  <Link href={elem.path} key={elem.value}>
                    <div className={styles.footer__title} key={elem.value}>
                      {elem.value}
                    </div>
                  </Link>
                );
              }
              if (elem.type === "text") {
                return (
                  <Link href={elem.path} key={elem.value}>
                    <div className={styles.footer__text} key={elem.value}>
                      {elem.value}
                    </div>
                  </Link>
                );
              }
            }
          )}
        </div>
        <div className={styles.footer__colum}>
          {FOOTER_ITEMS.slice(
            Math.floor(FOOTER_ITEMS.length / 2),
            FOOTER_ITEMS.length
          ).map((elem) => {
            if (elem.type === "title") {
              return (
                <Link href={elem.path} key={elem.value}>
                  <div className={styles.footer__title} key={elem.value}>
                    {elem.value}
                  </div>
                </Link>
              );
            }
            if (elem.type === "text") {
              return (
                <Link href={elem.path} key={elem.value}>
                  <div className={styles.footer__text} key={elem.value}>
                    {elem.value}
                  </div>
                </Link>
              );
            }
          })}
        </div>
      </nav>
    </footer>
  );
}
