import * as yup from 'yup';

export const NAME_MAX_LENGTH = 100;

const ClientFormValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('name.errors.required')
    .max(NAME_MAX_LENGTH, 'name.errors.maxLength')
    .trim(),
});

export default ClientFormValidationSchema;