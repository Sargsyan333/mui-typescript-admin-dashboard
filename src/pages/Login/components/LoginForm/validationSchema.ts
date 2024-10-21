import * as yup from 'yup';

import { PASSWORD_REGEX } from 'constants/main';

const LoginSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email('email.errors.invalid')
      .required('email.errors.required'),
    password: yup
      .string()
      .matches(PASSWORD_REGEX, 'password.errors.invalid')
      .required('password.errors.required'),
  })
  .required()

export default LoginSchema;
