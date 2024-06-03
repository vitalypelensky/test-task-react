import { FC, memo, ChangeEvent, useMemo, ReactElement } from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

interface IInput {
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
  onBlur?: (e: React.FocusEvent<any>) => void;
}

const Input: FC<IInput> = ({
  name,
  type = "text",
  value = "",
  error,
  onFocus,
  touched,
  onChange,
  className,
  placeholder,
  rightContent,
  customError,
}) => {
  const isSuccess = !error && touched;
  const isError = !!error && touched;

  const stylesInput = useMemo(
    () =>
      cn(styles.input, {
        [styles.error]: isError,
        [styles.success]: isSuccess,
        [styles.withRightContent]: !!rightContent,
      }),
    [isError, isSuccess, rightContent],
  );

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
    onChange(event.target.value);

  return (
    <div className={className}>
      <div className={styles.inputWrapper}>
        <input
          name={name}
          type={type}
          value={value}
          onFocus={onFocus}
          className={stylesInput}
          placeholder={placeholder}
          onChange={onChangeHandler}
        />
        <div className={styles.rightContent}>{rightContent}</div>
      </div>
      {!customError && isError && <p className={styles.errorText}>{error}</p>}
      {customError}
    </div>
  );
};

export default memo(Input);
