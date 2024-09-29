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
      <button className={styles.menu} onClick={handleMenuClick}>
        <span
          className={`${menuOpen && styles.active} ${styles.menu__line}`}
        ></span>
        <span
          className={`${menuOpen && styles.active} ${styles.menu__line}`}
        ></span>
        <span
          className={`${menuOpen && styles.active} ${styles.menu__line}`}
        ></span>
      </button>
      {menuOpen && (
        <nav className={styles.menuContainer}>
          <NavigationList setMenuOpen={() => setMenuOpen(false)} />
        </nav>
      )}
    </>
  );
}
