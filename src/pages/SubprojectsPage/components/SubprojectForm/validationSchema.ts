import * as yup from 'yup';

export const CODE_LENGTH = 6;

const SubprojectFormValidationSchema = yup.object().shape({
  code: yup
    .string()
    .required('code.errors.required')
    .length(CODE_LENGTH, 'code.errors.length')
    .trim(),
  project: yup
    .object()
    .shape({
      name: yup.string().required(),
      value: yup.string().required(),
    })
    .required('project.errors.required'),
  coworker: yup
    .object()
    .shape({
      name: yup.string().required(),
      value: yup.string().required(),
    })
    .nullable(),
});

export default SubprojectFormValidationSchema;