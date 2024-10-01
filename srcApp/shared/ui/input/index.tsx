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
        <label htmlFor={`input-${text}`} className={styles.text}>
          {text}
        </label>
        <input
          id={`input-${text}`}
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
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `error-${text}` : undefined}
        />
        {error && (
          <span id={`error-${text}`} className={styles.error} role="alert">
            {error}
          </span>
        )}
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
