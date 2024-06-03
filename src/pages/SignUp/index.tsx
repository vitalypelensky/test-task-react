import { FC } from "react";
import cn from "classnames";
import { useFormik } from "formik";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { FORM_FIELDS } from "../../constants";
import { shapes } from "./shapes";
import { getFieldProps } from "../../helpers";
import PasswordInput from "../../components/PasswordInput";

import styles from "./styles.module.css";

const { EMAIL, PASSWORD } = FORM_FIELDS;

const SignUp: FC = () => {
  const formik = useFormik({
    validateOnBlur: false,
    validateOnMount: false,
    validateOnChange: false,
    enableReinitialize: false,
    validationSchema: shapes.schema(),
    initialValues: shapes.initialValues,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, "\t"));
    },
  });

  const { handleSubmit } = formik;

  const fieldProps = getFieldProps(formik);

  return (
    <div className={cn(styles.wrapper, "fullWidth")}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>Sign Up</h1>
          <Input
            {...fieldProps(EMAIL)}
            className={styles.input}
            placeholder="Enter you email"
          />
          <PasswordInput
            {...fieldProps(PASSWORD)}
            isHiddenMode
            placeholder="Create your password"
          />
          <Button text="Sign up" type="submit" className={styles.button} />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
