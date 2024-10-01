import { forwardRef } from "react";
import styles from "./styles.module.css";

type TextAreaProps = {
  text: string;
  placeholder: string;
  color?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  pattern?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  error?: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { text, placeholder, color, required, disabled, onChange, value, error },
    ref
  ) => {
    return (
      <div className={styles.textareaContainer}>
        <label htmlFor={`textarea-${text}`} className={styles.text}>
          {text}
        </label>
        <textarea
          id={`textarea-${text}`}
          className={styles.textarea}
          style={{ backgroundColor: color, resize: "none" }}
          onChange={onChange}
          placeholder={placeholder}
          required={required || false}
          disabled={disabled || false}
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
      </div>
    );
  }
);
TextArea.displayName = "TextArea";

export { TextArea };
