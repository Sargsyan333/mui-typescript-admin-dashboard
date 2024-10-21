import * as yup from 'yup';

import { PASSWORD_REGEX } from 'constants/main';

const ChangePasswordSchema = yup
  .object({
    oldPassword: yup
      .string()
      .matches(PASSWORD_REGEX, 'oldPassword.errors.invalid')
      .required('oldPassword.errors.required'),
    newPassword: yup
      .string()
      .matches(PASSWORD_REGEX, 'newPassword.errors.invalid')
      .notOneOf([yup.ref("oldPassword")], 'newPassword.errors.match')
      .required('newPassword.errors.required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], 'confirmPassword.errors.notMatch')
      .required('confirmPassword.errors.required'),
  })
  .required()

export default ChangePasswordSchema;
