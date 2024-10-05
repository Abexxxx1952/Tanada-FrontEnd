import { Logo } from "@/srcApp/shared/ui/logo";
import { AvatarWithDropdown } from "../avatar-with-dropdown";
import { NavigationList } from "../navigation-list";
import { Menu } from "../menu";
import styles from "./styles.module.css";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";

export function Header() {
  const { currentUser } = useAppContext();
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
      <span className={styles.header__currentUser}>
        {currentUser !== null
          ? `Curren User: ${currentUser?.name}`
          : `Curren User: All users`}
      </span>
    </header>
  );
}
