import styles from "./Button.module.css";
import clsx from "clsx";

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(styles.button, styles[className])}
      {...rest}
    >
      {children}
    </button>
  );
}
