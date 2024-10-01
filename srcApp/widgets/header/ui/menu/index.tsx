import { useState } from "react";
import { NavigationList } from "../navigation-list";
import styles from "./styles.module.css";

export function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleMenuClick() {
    setMenuOpen(!menuOpen);
  }

  return (
    <>
      <button
        className={styles.menu}
        onClick={handleMenuClick}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span
          className={`${menuOpen && styles.active} ${styles.menu__line}`}
          aria-hidden="true"
        ></span>
        <span
          className={`${menuOpen && styles.active} ${styles.menu__line}`}
          aria-hidden="true"
        ></span>
        <span
          className={`${menuOpen && styles.active} ${styles.menu__line}`}
          aria-hidden="true"
        ></span>
      </button>
      {menuOpen && (
        <nav
          className={styles.menuContainer}
          role="navigation"
          aria-label="Main menu"
        >
          <NavigationList setMenuOpen={() => setMenuOpen(false)} />
        </nav>
      )}
    </>
  );
}
