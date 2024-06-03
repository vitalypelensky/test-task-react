import { FormikValues } from "formik/dist/types";
import { getValue } from "./common";

type IValue = string | number | boolean | null | undefined;

interface IFormField {
  value: any;
  name: string;
  touched?: boolean;
  onFocus?: () => void;
  error?: string | undefined;
  onChange: (value: IValue) => void;
}

export const getFieldProps =
  (formik: FormikValues) =>
  (field: string): IFormField => {
    const error = getValue(formik.errors, field, undefined);
    const value = getValue(formik.values, field, undefined);
    const touched = getValue(formik.touched, field, false);

    return {
      value,
      error,
      touched,
      name: field,
      onFocus: () => formik.setFieldTouched(field, false),
      onChange: (newValue: IValue) => {
        formik.setFieldValue(field, newValue);
      },
    };
  };
