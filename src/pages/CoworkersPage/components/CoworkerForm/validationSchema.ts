import * as yup from 'yup';

export const COMPANY_NAME_MAX_LENGTH = 50;

const CoworkerFormValidationSchema = yup.object().shape({
  companyName: yup
    .string()
    .required('companyName.errors.required')
    .max(COMPANY_NAME_MAX_LENGTH, 'companyName.errors.maxLength')
    .trim(),
  emailAddress: yup
    .string()
    .email('emailAddress.errors.invalid')
    .required('emailAddress.errors.required'),
});

export default CoworkerFormValidationSchema;