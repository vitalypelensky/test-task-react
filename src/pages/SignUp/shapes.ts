import { object, string } from "yup";

import { FORM_FIELDS, PASSWORD_RULES } from "../../constants";

const { EMAIL, PASSWORD } = FORM_FIELDS;

export interface ISingUpFormData {
  [EMAIL]: string;
  [PASSWORD]: string;
}

const initialValues: ISingUpFormData = {
  [EMAIL]: "",
  [PASSWORD]: "",
};

export const shapes = {
  initialValues,
  schema: () =>
    object().shape({
      [EMAIL]: string()
        .email("Invalid email format")
        .required("Email is required"),
      [PASSWORD]: string()
        .trim()
        .test({
          name: "password-validate",
          message:
            "This password doesn't look right. Please try again or reset it now.",
          test: (value) =>
            !!value &&
            PASSWORD_RULES.MIN_LENGTH <= value.length &&
            PASSWORD_RULES.MAX_LENGTH >= value.length &&
            PASSWORD_RULES.UPPERCASE_LETTER.test(value) &&
            PASSWORD_RULES.ONE_DIGIT.test(value),
        }),
    }),
};
