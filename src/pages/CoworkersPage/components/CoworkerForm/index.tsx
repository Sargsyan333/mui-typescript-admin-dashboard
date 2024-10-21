import { TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import React, { useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import CoworkerFormValidationSchema, { COMPANY_NAME_MAX_LENGTH } from
    'pages/CoworkersPage/components/CoworkerForm/validationSchema';
import { CoworkerEditableProps } from 'types/coworkers';
import MainForm from 'components/MainForm';

type CoworkerFormProps = {
  onSubmit: (newData: CoworkerEditableProps, isDataChanged: boolean) => void;
  currentData?: CoworkerEditableProps | null;
  submitError?: string;
  isLoading: boolean;
};

const defaultFormValuesInitialState = {
  companyName: '',
  emailAddress: '',
};

const CoworkerForm: React.FC<CoworkerFormProps> = ({
   onSubmit,
   submitError,
   currentData,
   isLoading
}) => {
  let defaultFormValues = defaultFormValuesInitialState;
  if (currentData) {
    defaultFormValues = {
      companyName: currentData.companyName,
      emailAddress: currentData.emailAddress,
    };
  }

  const {
    handleSubmit,
    formState: { isDirty, errors },
    control,
  } = useForm({
    defaultValues: defaultFormValues,
    resolver: yupResolver(CoworkerFormValidationSchema),
  });
  const { t } = useTranslation('coworkers', {keyPrefix: 'form'});

  const isSubmitBtnDisabled = Object.keys(errors).length > 0;

  const onFormSubmit = useCallback(
    (data: CoworkerEditableProps) => {
      onSubmit(data, isDirty);
    },
    [onSubmit, isDirty],
  );

  return (
    <MainForm
      submitError={submitError}
      isSubmitBtnDisabled={isSubmitBtnDisabled}
      onSubmit={handleSubmit(onFormSubmit)}
      cancelLink="/coworkers"
      isLoading={isLoading}
    >
        <>
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('companyName.label')}
                variant="outlined"
                fullWidth
                error={!!errors.companyName}
                helperText={errors?.companyName?.message ? t(errors.companyName.message, { max: COMPANY_NAME_MAX_LENGTH }) : ''}
              />
            )}
          />
          <Controller
            name="emailAddress"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('emailAddress.label')}
                variant="outlined"
                fullWidth
                error={!!errors.emailAddress}
                helperText={errors?.emailAddress?.message ? t(errors.emailAddress.message) : ''}
              />
            )}
          />
        </>
    </MainForm>
  );
};

export default CoworkerForm;
