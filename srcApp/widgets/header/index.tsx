import { Logo } from "../../shared/ui/header-logo";
import { HeaderList } from "../../shared/ui/header-list";
import { AvatarWithDropdown } from "../avatar-with-dropdown";
import styles from "./styles.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      {<Logo />}
      {<HeaderList />}
      {<AvatarWithDropdown />}
    </header>
  );
}
