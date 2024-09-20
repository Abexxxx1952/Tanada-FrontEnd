import Link from "next/link";
import { usePathname } from "next/navigation";
import { HEADER_ITEMS } from "../../constants/header-list";
import styles from "./styles.module.css";

export function HeaderList() {
  const pathname = usePathname();
  return (
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
  );
}
