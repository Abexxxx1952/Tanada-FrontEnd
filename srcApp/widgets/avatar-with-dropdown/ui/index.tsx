"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginModal } from "../../login-modal";
import { UserFromServer } from "@/srcApp/entities/user/model/types";
import { fetchUserData } from "@/srcApp/entities/user/api/fetchUserData";
import { isUserFromServer } from "@/srcApp/entities/user/model/isUserFromServer";
import { logoutUser } from "@/srcApp/features/auth/logout/model/logout-user";
import { ErrorData } from "@/srcApp/shared/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { toast } from "react-toastify";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";
import { useIcon } from "@/srcApp/shared/hooks/useIcon";
import { useClickOutside } from "@/srcApp/shared/hooks/useClickOutside";
import styles from "./styles.module.css";

export function AvatarWithDropdown() {
  const { user, setUser, currentUser, setCurrentUser } = useAppContext();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);

  const portalRef = useRef<Element | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useClickOutside(dropdownRef, () => setDropdownOpen(false));

  const imageSrc = useIcon(
    user?.icon,
    "/icons/header-account.svg",
    "/icons/logged.svg",
    user
  );

  async function handelEmail() {
    setCurrentUser(user);
    setDropdownOpen(false);
  }
  async function handelStats() {
    setDropdownOpen(false);
    router.push(`/stats/${user?.id}/stats`);
  }
  async function handelLogOut() {
    try {
      await logoutUser();
      setUser(null);
      router.replace("/");
      setDropdownOpen(false);
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  }

  useEffect(() => {
    portalRef.current = document.getElementById("portal");

    (async () => {
      const userOrError: UserFromServer | undefined | ErrorData =
        await fetchUserData();

      if (userOrError === undefined) {
        setUser(null);
      }

      if (isErrorData(userOrError)) {
        toast.error(
          `Error: ${userOrError.status} ${
            userOrError.statusText
          }. Massage: ${JSON.stringify(userOrError)}`,
          {
            position: "top-right",
          }
        );
        setUser(null);
      }

      if (isUserFromServer(userOrError)) {
        setUser(userOrError);

        setCurrentUser(userOrError);
      }
    })();
  }, []);

  useEffect(() => {
    if (user !== null) router.push(`/${user.id}`);
  }, [user]);

  return (
    <div className={styles.avatarWithDropdownContainer}>
      <div
        className={styles.headerAccount}
        onClick={
          user ? () => setDropdownOpen(true) : () => setLoginModalOpen(true)
        }
      >
        <div className={styles.headerAccount__image}>
          <img
            className={styles.headerAccount__logo}
            src={imageSrc.imageSrc}
            alt="Account icon"
          />
        </div>

        <div className={styles.headerAccount__text}>{user ? "" : "Log In"}</div>
      </div>
      <div className={styles.dropdownContainer}>
        {dropdownOpen && (
          <div className={styles.dropdown} ref={dropdownRef}>
            <div className={styles.email} onClick={handelEmail}>
              {user?.email}
            </div>
            <div className={styles.separator}></div>
            <Link
              href="/profile"
              className={styles.profile}
              onClick={() => setDropdownOpen(false)}
            >
              Profile
            </Link>
            <div className={styles.stats} onClick={handelStats}>
              My statistics
            </div>
            <div className={styles.logOut} onClick={handelLogOut}>
              Log Out
            </div>
          </div>
        )}
      </div>

      {portalRef.current &&
        loginModalOpen &&
        createPortal(
          <LoginModal setModalOpen={setLoginModalOpen} />,
          portalRef.current
        )}
    </div>
  );
}
