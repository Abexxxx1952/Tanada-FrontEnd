import styles from "./styles.module.css";

type ButtonProps = {
  text: string;
  textColor?: string;
  backgroundColor?: string;
  icon?: string;
  focusTextColor?: string;
  focusBackgroundColor?: string;
  onClick: () => void;
};

export function Button({
  text,
  textColor,
  backgroundColor,
  icon,
  focusTextColor,
  focusBackgroundColor,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={styles.button}
      style={{ backgroundColor: backgroundColor, color: textColor }}
      onClick={onClick}
      onFocus={(e) => {
        if (focusBackgroundColor)
          e.currentTarget.style.outline = focusBackgroundColor;
        if (focusTextColor) e.currentTarget.style.color = focusTextColor;
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = "none";
        if (textColor) e.currentTarget.style.color = textColor;
      }}
    >
      {icon && <img src={icon} className={styles.googleIcon} alt="Icon" />}
      {text}
    </button>
  );
}
