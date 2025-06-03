import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./PasswordField.module.css";

export default function PasswordField({
  value,
  onChange,
  placeholder,
  required = false,
}) {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.wrapper}>
      <input
        type={show ? "text" : "password"}
        className={styles.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      <button
        type="button"
        className={styles.eyeButton}
        onClick={() => setShow((prev) => !prev)}
        aria-label="Toggle password visibility"
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
}
