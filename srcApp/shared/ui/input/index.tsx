import styles from "./styles.module.css";

type ButtonProps = {
  text: string;
  placeholder: string;
  color?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  pattern?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export function Input({
  text,
  placeholder,
  color,
  type,
  required,
  disabled,
  pattern,
  onChange,
  value,
}: ButtonProps) {
  return (
    <>
      <span className={styles.text}>{text}</span>
      <input
        className={styles.input}
        style={{ backgroundColor: color }}
        onChange={onChange}
        type={type || "text"}
        placeholder={placeholder}
        required={required || false}
        disabled={disabled || false}
        pattern={pattern || undefined}
        value={value}
      />
    </>
  );
}
