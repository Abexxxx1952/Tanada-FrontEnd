"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HeaderAccount } from "../../shared/ui/header-account";
import { Dropdown } from "@/srcApp/shared/ui/dropdown";
import { LoginModal } from "../login-modal";
import styles from "./styles.module.css";
import { UserFromServer } from "@/srcApp/entities/user/model/types";
import { fetchUserData } from "@/srcApp/features/user/model/fetchUserData";
import { isUserFromServer } from "@/srcApp/features/user/lib/isUserFromServer";
import { ErrorData } from "@/srcApp/features/user/model/types";
import { isErrorData } from "@/srcApp/features/user/lib/isErrorData";
import { toast } from "react-toastify";
import { Profile } from "../profile";

/* type AvatarWithDropdownProps = {
  fetchUserData: () => Promise<UserFromServer | undefined>;
};
 */
export function AvatarWithDropdown() {
  const [user, setUser] = useState<UserFromServer | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);

  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById("portal");

    (async () => {
      const userOrError: UserFromServer | undefined | ErrorData =
        await fetchUserData();

      if (isErrorData(userOrError)) {
        toast.error(
          `Error: ${userOrError.status} ${
            userOrError.statusText
          }. Massage: ${JSON.stringify(userOrError)}`,
          {
            position: "top-right",
          }
        );
      }

      if (isUserFromServer(userOrError)) {
        setUser(userOrError);
      }
    })();
  }, []);

  return (
    <div className={styles.avatarWithDropdownContainer}>
      <HeaderAccount
        user={user}
        setDropdownOpen={() => setDropdownOpen((prev: boolean) => !prev)}
        setLoginModalOpen={setLoginModalOpen}
      />
      <div className={styles.dropdownContainer}>
        {dropdownOpen && (
          <Dropdown
            userEmail={user?.email}
            setUser={setUser}
            setDropdownOpen={setDropdownOpen}
          />
        )}
      </div>

      {ref.current &&
        loginModalOpen &&
        createPortal(
          <LoginModal setModalOpen={setLoginModalOpen} setUser={setUser} />,
          ref.current
        )}
    </div>
  );
}
