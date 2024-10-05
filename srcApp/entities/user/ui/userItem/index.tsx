import Image from "next/image";
import { UserFromServer } from "@/srcApp/entities/user/model/types";
import styles from "./styles.module.css";
import { useIcon } from "@/srcApp/shared/hooks/useIcon";

type UserItemProps = {
  user: UserFromServer;
  handleUserClick: (user: UserFromServer) => void;
};

export function UserItem({ user, handleUserClick }: UserItemProps) {
  return (
    <li
      className={styles.userItem}
      onClick={() => handleUserClick(user)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${user.name || "user"}`}
    >
      <span className={styles.userItem__icon}>
        <Image
          src={user.icon || "/icons/header-account.svg"}
          fill={true}
          alt={`${user.name || "User"} icon`}
        />
      </span>
      <div className={styles.userItem__email}>{user.email}</div>
      <div className={styles.userItem__name}>
        {user.name ? `${user.name}` : "NO NAME"}
      </div>
      <time className={styles.userItem__createdAt}>
        Created at:&nbsp;
        {user?.createdAt?.toLocaleString().split("T")[0] || "N/A"}
      </time>
      <div className={styles.userItem__photoLength}>
        Number of photos:&nbsp;{user?.photo.length}
      </div>
    </li>
  );
}
