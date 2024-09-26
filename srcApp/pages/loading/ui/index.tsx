import { LoadingSite } from "@/srcApp/shared/ui/loadingSite";
import styles from "./styles.module.css";

export function LoadingPage() {
  return (
    <div className={styles.loadingIndicator}>
      <LoadingSite />
    </div>
  );
}
