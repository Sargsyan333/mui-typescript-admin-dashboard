import * as yup from 'yup';


export const NAME_MAX_LENGTH = 100;
export const CODE_LENGTH = 7;

const ProjectFormValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('name.errors.required')
    .max(NAME_MAX_LENGTH, 'name.errors.maxLength')
    .trim(),
  code: yup
    .string()
    .required('code.errors.required')
    .length(CODE_LENGTH, 'code.errors.length')
    .trim(),
  client: yup
    .object()
    .shape({
      name: yup.string().required(),
      value: yup.string().required(),
    })
    .required('client.errors.required'),
  coworker: yup
    .object()
    .shape({
      name: yup.string().required(),
      value: yup.string().required(),
    })
    .nullable(),
});

export default ProjectFormValidationSchema;