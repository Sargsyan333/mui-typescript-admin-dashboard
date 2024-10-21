import * as yup from 'yup';

import { PASSWORD_REGEX } from 'constants/main';

const ResetPasswordSchema = yup
  .object({
    password: yup
      .string()
      .matches(PASSWORD_REGEX, 'password.errors.invalid')
      .required('password.errors.required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], 'confirmPassword.errors.notMatch')
      .required('confirmPassword.errors.required'),
  })
  .required()

export default ResetPasswordSchema;
