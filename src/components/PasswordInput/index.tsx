import { FC, memo, ReactElement, useState, useMemo } from "react";
import cn from "classnames";

import Input from "../Input";
import { PASSWORD_RULES } from "../../constants";
import eyeIcon from "../../assets/icons/eye.svg";
import closeEyeIcon from "../../assets/icons/closeEye.svg";

import styles from "./styles.module.scss";

interface IPasswordInput {
  name?: string;
  value?: string;
  error?: string;
  touched?: boolean;
  className?: string;
  isSuccess?: boolean;
  placeholder?: string;
  onFocus?: () => void;
  isHiddenMode?: boolean;
  initialShowError?: boolean;
  type?: "text" | "password";
  customError?: ReactElement;
  rightContent?: ReactElement;
  onChange: (value: string) => void;
}

const PasswordInput: FC<IPasswordInput> = ({
  value = "",
  touched,
  ...props
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const type = isHidden ? "password" : "text";
  const validationRules = useMemo(
    () => [
      {
        isValid: value && value.length >= PASSWORD_RULES.MIN_LENGTH,
        label: `${PASSWORD_RULES.MIN_LENGTH} characters or more (no spaces)`,
      },
      {
        isValid: value && value.length <= PASSWORD_RULES.MAX_LENGTH,
        label: `${PASSWORD_RULES.MAX_LENGTH} characters or more (no spaces)`,
      },
      {
        isValid: PASSWORD_RULES.UPPERCASE_LETTER.test(value),
        label: "at least 1 uppercase letter",
      },
      {
        isValid: PASSWORD_RULES.ONE_DIGIT.test(value),
        label: "at least 1 number",
      },
    ],
    [value],
  );

  const onToggleHiddenView = () =>
    setIsHidden((currentIsHidden) => !currentIsHidden);

  const hideShowIcon = (
    <img
      alt="eye icon"
      className={styles.icon}
      onClick={onToggleHiddenView}
      src={isHidden ? closeEyeIcon : eyeIcon}
    />
  );

  const errorListElement = (
    <ul className={styles.list}>
      {validationRules.map((validationRule) => (
        <li
          key={validationRule.label}
          className={cn(styles.rule, {
            [styles.success]: !!value && validationRule.isValid,
            [styles.error]: !!value && !validationRule.isValid,
          })}
        >
          {validationRule.label}
        </li>
      ))}
    </ul>
  );

  return (
    <Input
      {...props}
      {...(!touched && { customError: errorListElement })}
      type={type}
      value={value}
      touched={touched}
      rightContent={hideShowIcon}
    />
  );
};

export default memo(PasswordInput);
