import * as yup from 'yup';

const ForgotPasswordSchema = yup
  .object({
    email: yup
      .string()
      .email('email.errors.invalid')
      .required('email.errors.required'),
  })
  .required()

export default ForgotPasswordSchema;
