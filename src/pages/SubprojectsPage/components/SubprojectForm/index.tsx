import { TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import React, { useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import { SubprojectEditableProps } from 'types/subprojects';
import SubprojectFormValidationSchema, {
  CODE_LENGTH,
} from 'pages/SubprojectsPage/components/SubprojectForm/validationSchema';
import MainForm from 'components/MainForm';
import ProjectSelectWithSearch from 'components/ProjectSelectWithSearch';
import CoworkerSelectWithSearch from 'components/CoworkerSelectWithSearch';

type Props = {
  onSubmit: (newData: SubprojectEditableProps, isDataChanged: boolean) => void;
  currentData?: SubprojectEditableProps | null;
  submitError?: string;
  isLoading: boolean;
};

const defaultFormValuesInitialState: SubprojectEditableProps = {
  code: '',
  project: {name: '', value: ''},
  coworker: null,
};

const SubprojectForm: React.FC<Props> = ({
   onSubmit,
   submitError,
   currentData,
   isLoading,
}) => {
  let defaultFormValues = defaultFormValuesInitialState;
  if (currentData) {
    defaultFormValues = {
      code: currentData.code,
      project: currentData.project,
      coworker: currentData.coworker,
    };
  }

  const {
    handleSubmit,
    formState: { isDirty, errors },
    control,
  } = useForm({
    defaultValues: defaultFormValues,
    resolver: yupResolver(SubprojectFormValidationSchema),
  });
  const { t } = useTranslation('subprojects', {keyPrefix: 'form'});

  const isSubmitBtnDisabled = Object.keys(errors).length > 0;

  const onFormSubmit = useCallback(
    (data: SubprojectEditableProps) => {
      onSubmit(data, isDirty);
    },
    [onSubmit, isDirty],
  );

  return (
    <MainForm
      onSubmit={handleSubmit(onFormSubmit)}
      submitError={submitError}
      isSubmitBtnDisabled={isSubmitBtnDisabled}
      cancelLink="/subprojects"
      isLoading={isLoading}
    >
        <>
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('code.label')}
                variant="outlined"
                fullWidth
                error={!!errors.code}
                helperText={errors?.code?.message ? t(errors.code.message, { length: CODE_LENGTH }) : ''}
              />
            )}
          />
          <Controller
            name="project"
            control={control}
            render={({field}) => (
              <ProjectSelectWithSearch
                placeholder={t('project.placeholder')}
                noOptionsText={t('project.notFound')}
                fieldProps={field}
                errorMessage={errors?.project?.message ? t(errors.project.message) : ''}
              />
            )}
          />
          <Controller
            name="coworker"
            control={control}
            render={({field}) => (
              <CoworkerSelectWithSearch
                fieldProps={field}
                placeholder={t('coworker.placeholder')}
                noOptionsText={t('coworker.notFound')}
              />
            )}
          />
        </>
    </MainForm>
  );
};

export default SubprojectForm;
