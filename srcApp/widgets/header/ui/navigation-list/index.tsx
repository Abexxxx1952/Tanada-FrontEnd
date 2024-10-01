import Link from "next/link";
import { usePathname } from "next/navigation";
import { HEADER_ITEMS } from "@/srcApp/shared/constants/header-list";
import { isActivePath } from "@/srcApp/widgets/header/model/isActivePath";
import styles from "./styles.module.css";

type NavigationListProps = {
  setMenuOpen: () => void;
};

export function NavigationList({ setMenuOpen }: NavigationListProps) {
  const pathname = usePathname();

  return (
    <ul className={styles.navigationContent} role="list">
      {HEADER_ITEMS.map((elem) => {
        return (
          <li
            key={elem.value}
            className={`${styles.navigationContent__item} ${
              isActivePath(pathname, elem.path) && styles.active
            }`}
            role="listitem"
            aria-current={
              isActivePath(pathname, elem.path) ? "page" : undefined
            }
          >
            <Link
              href={elem.path}
              onClick={setMenuOpen}
              aria-label={`Go to ${elem.value}`}
            >
              {elem.value}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
