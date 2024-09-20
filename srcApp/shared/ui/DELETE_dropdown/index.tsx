import Link from "next/link";
import styles from "./styles.module.css";
import { UserFromServer } from "@/srcApp/entities/user/model/types";
import { logoutUser } from "@/srcApp/features/auth/logout/model/logout-user";
import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

type DropdownProps = {
  userEmail: string | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserFromServer | null>>;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Dropdown({
  userEmail,
  setUser,
  setDropdownOpen,
}: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setDropdownOpen(false));

  async function logOut() {
    try {
      await logoutUser();
      setUser(null);
      setDropdownOpen(false);
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  }

  return (
    <div className={styles.dropdown} ref={ref}>
      <div className={styles.email}>{userEmail}</div>
      <div className={styles.separator}></div>

      <Link
        href="/profile"
        className={styles.profile}
        onClick={() => setDropdownOpen(false)}
      >
        Profile
      </Link>

      <div className={styles.logOut} onClick={logOut}>
        Log Out
      </div>
    </div>
  );
}
