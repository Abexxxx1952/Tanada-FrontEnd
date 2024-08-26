import { UserFromServer } from "@/srcApp/entities/user/model/types";

import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useIcon } from "../../hooks/useIcon";

type HeaderAccountProps = {
  user: UserFromServer | null;
  setDropdownOpen: () => void;
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function HeaderAccount({
  user,
  setDropdownOpen,
  setLoginModalOpen,
}: HeaderAccountProps) {
  const imageSrc = useIcon(user);

  return (
    <div
      className={styles.headerAccount}
      onClick={user ? setDropdownOpen : () => setLoginModalOpen(true)}
    >
      <div className={styles.headerAccount__image}>
        <img
          className={styles.headerAccount__logo}
          src={imageSrc}
          alt="Account icon"
        />
      </div>

      <div className={styles.headerAccount__text}>{user ? "" : "Log In"}</div>
    </div>
  );
}
