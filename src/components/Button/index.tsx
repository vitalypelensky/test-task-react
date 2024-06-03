import { FC, memo } from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

interface IButton {
  text: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button: FC<IButton> = ({
  type = "button",
  text,
  onClick,
  disabled,
  className,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={cn(styles.button, className, { [styles.disabled]: disabled })}
  >
    {text}
  </button>
);

export default memo(Button);
