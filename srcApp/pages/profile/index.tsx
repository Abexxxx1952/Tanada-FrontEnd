import { Profile } from "@/srcApp/widgets/profile";
import styles from "./styles.module.css";

export function ProfilePage() {
  return (
    <div className={styles.profileContainer}>
      <Profile />
    </div>
  );
}
