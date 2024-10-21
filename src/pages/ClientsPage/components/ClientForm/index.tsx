import { TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import React, { useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import { ClientEditableProps } from 'types/clients';
import ClientFormValidationSchema, { NAME_MAX_LENGTH } from 'pages/ClientsPage/components/ClientForm/validationSchema';
import MainForm from 'components/MainForm';

type Props = {
  onSubmit: (newData: ClientEditableProps, isDataChanged: boolean) => void;
  currentData?: ClientEditableProps | null;
  submitError?: string;
  isLoading: boolean;
};

const defaultFormValuesInitialState = {
  name: '',
};

const ClientForm: React.FC<Props> = ({
   onSubmit,
   submitError,
   currentData,
   isLoading,
}) => {
  let defaultFormValues = defaultFormValuesInitialState;
  if (currentData) {
    defaultFormValues = {
      name: currentData.name,
    };
  }

  const {
    handleSubmit,
    formState: { isDirty, errors },
    control,
  } = useForm({
    defaultValues: defaultFormValues,
    resolver: yupResolver(ClientFormValidationSchema),
  });
  const { t } = useTranslation('clients', {keyPrefix: 'form'});

  const isSubmitBtnDisabled = Object.keys(errors).length > 0;

  const onFormSubmit = useCallback(
    (data: ClientEditableProps) => {
      onSubmit(data, isDirty);
    },
    [onSubmit, isDirty],
  );

  return (
    <MainForm
      submitError={submitError}
      isSubmitBtnDisabled={isSubmitBtnDisabled}
      onSubmit={handleSubmit(onFormSubmit)}
      cancelLink={"/clients"}
      isLoading={isLoading}
    >
      <>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('name.label')}
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors?.name?.message ? t(errors.name.message, { max: NAME_MAX_LENGTH }) : ''}
            />
          )}
        />
      </>
    </MainForm>
  );
};

export default ClientForm;
