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
    <ul className={styles.navigationContent}>
      {HEADER_ITEMS.map((elem) => {
        return (
          <li
            key={elem.value}
            className={`${styles.navigationContent__item} ${
              isActivePath(pathname, elem.path) && styles.active
            }`}
          >
            <Link href={elem.path} onClick={setMenuOpen}>
              {elem.value}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
