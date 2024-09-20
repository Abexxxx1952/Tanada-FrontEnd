import styles from "./styles.module.css";

type ButtonProps = {
  text: string;
  textColor?: string;
  backgroundColor?: string;
  icon?: string;
  focusTextColor?: string;
  focusBackgroundColor?: string;
  boxShadow?: string;
  loading?: boolean;
  disabled?: boolean;
  type?: "submit" | "button" | "reset" | undefined;
  onClick?: () => void;
};

export function Button({
  text,
  textColor,
  backgroundColor,
  icon,
  focusTextColor,
  focusBackgroundColor,
  boxShadow,
  loading = false,
  disabled = false,
  type,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={styles.button}
      disabled={disabled}
      style={{ backgroundColor: backgroundColor, color: textColor }}
      onClick={onClick}
      type={type ? type : undefined}
      onFocus={(e) => {
        if (focusBackgroundColor)
          e.currentTarget.style.backgroundColor = focusBackgroundColor;
        if (focusTextColor) e.currentTarget.style.color = focusTextColor;
        if (boxShadow) e.currentTarget.style.boxShadow = boxShadow;
      }}
      onBlur={(e) => {
        if (backgroundColor)
          e.currentTarget.style.backgroundColor = backgroundColor;
        if (textColor) e.currentTarget.style.color = textColor;
        if (focusTextColor) e.currentTarget.style.boxShadow = "none";
      }}
      onMouseEnter={(e) => {
        if (focusBackgroundColor)
          e.currentTarget.style.backgroundColor = focusBackgroundColor;
        if (focusTextColor) e.currentTarget.style.color = focusTextColor;
        if (boxShadow) e.currentTarget.style.boxShadow = boxShadow;
      }}
      onMouseLeave={(e) => {
        if (backgroundColor)
          e.currentTarget.style.backgroundColor = backgroundColor;
        if (textColor) e.currentTarget.style.color = textColor;
        if (focusTextColor) e.currentTarget.style.boxShadow = "none";
      }}
    >
      {icon && <img src={icon} className={styles.icon} alt="Icon" />}
      {loading ? (
        <div className={styles.spinner}>
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        </div>
      ) : (
        text
      )}
    </button>
  );
}
