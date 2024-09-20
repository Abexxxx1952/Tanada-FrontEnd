import { forwardRef } from "react";
import styles from "./styles.module.css";

type InputProps = {
  text: string;
  placeholder: string;
  color?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  pattern?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      text,
      placeholder,
      color,
      type,
      required,
      disabled,
      pattern,
      onChange,
      value,
      error,
    },
    ref
  ) => {
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
          ref={ref}
        />
        {error && <span className={styles.error}>{error}</span>}
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
