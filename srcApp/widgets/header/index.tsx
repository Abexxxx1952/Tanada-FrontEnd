import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/srcApp/shared/ui/logo";
import { AvatarWithDropdown } from "../avatar-with-dropdown";
import { HEADER_ITEMS } from "@/srcApp/shared/constants/header-list";
import styles from "./styles.module.css";

export function Header() {
  const pathname = usePathname();
  return (
    <header className={styles.header}>
      <Logo />
      <nav className={styles.navigation}>
        <ul className={styles.navigation__list}>
          {HEADER_ITEMS.map((elem) => {
            return (
              <li
                key={elem.value}
                className={`${styles.navigation__item} ${
                  pathname === elem.path && styles.active
                }`}
              >
                <Link href={elem.path}>{elem.value}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <AvatarWithDropdown />
    </header>
  );
}
