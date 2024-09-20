import Link from "next/link";
import styles from "./styles.module.css";

type TooltipProps = {
  text: string;
};

export function Tooltip({ text }: TooltipProps) {
  return (
    <div className={styles.tooltipContainer}>
      <div className={styles.tooltipContainer__content}>{text}</div>
    </div>
  );
}
