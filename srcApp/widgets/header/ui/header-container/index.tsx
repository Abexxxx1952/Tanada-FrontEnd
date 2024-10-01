import { Logo } from "@/srcApp/shared/ui/logo";
import { AvatarWithDropdown } from "../avatar-with-dropdown";
import { useState } from "react";
import { NavigationList } from "../navigation-list";
import { Menu } from "../menu";
import styles from "./styles.module.css";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleMenuClick() {
    setMenuOpen(!menuOpen);
  }

  return (
    <header className={styles.header}>
      <Logo />
      <Menu />
      <nav
        className={styles.navigation}
        role="navigation"
        aria-label="Main Navigation"
      >
        <NavigationList setMenuOpen={() => {}} />
      </nav>
      <AvatarWithDropdown />
    </header>
  );
}
