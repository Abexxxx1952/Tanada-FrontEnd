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
        <span className={styles.text}>{text}</span>
        <textarea
          className={styles.textarea}
          style={{ backgroundColor: color, resize: "none" }}
          onChange={onChange}
          placeholder={placeholder}
          required={required || false}
          disabled={disabled || false}
          value={value}
          ref={ref}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
);
TextArea.displayName = "TextArea";

export { TextArea };
