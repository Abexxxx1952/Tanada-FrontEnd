"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";
import { useKeyboardHandler } from "@/srcApp/shared/hooks/useKeyboardHandler";
import { fetchAllUserData } from "@/srcApp/entities/user/api/fetchAllUserData";
import { UserFromServer } from "@/srcApp/entities/user/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { UserItem } from "@/srcApp/entities/user/ui/userItem";
import styles from "./styles.module.css";

export function TravelersPage() {
  const { setCurrentUser } = useAppContext();
  const [users, setUsers] = useState<UserFromServer[] | null>(null);
  const [body, setBody] = useState<HTMLBodyElement | null>(null);

  const router = useRouter();

  useEffect(() => {
    setBody(document.querySelector("body"));
    (async function () {
      const usersOrError = await fetchAllUserData();
      if (
        !isErrorData(usersOrError) &&
        usersOrError !== undefined &&
        Array.isArray(usersOrError)
      ) {
        setUsers(usersOrError);
      }
    })();
  }, []);
  useKeyboardHandler(body, [["Escape", () => router.push("/")]]);

  const handleUserClick = (user: UserFromServer) => {
    setCurrentUser(user);
    router.push(`/${user.id}`);
  };

  return (
    <div className={styles.travelersContainer}>
      <div className={styles.travelers}>
        <h2 className={styles.travelers__title} id="travelers-title">
          Travelers
        </h2>
        <ul
          className={styles.travelers__usersList}
          aria-labelledby="travelers-title"
          role="list"
        >
          {users &&
            users?.map((user) => {
              return (
                <UserItem
                  user={user}
                  key={user.id}
                  handleUserClick={handleUserClick}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
}
