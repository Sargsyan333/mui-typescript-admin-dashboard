import { Alert, TextField } from '@mui/material';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import 'pages/ForgotPassword/components/ForgotPasswordForm/styles.css';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';

import ForgotPasswordSchema from 'pages/ForgotPassword/components/ForgotPasswordForm/validationSchema';
import { authenticationService } from 'services';
import { ServiceError } from 'services/helperTypes';

type Props = {
  onSubmit: (email: string) => void;
}

const ForgotPasswordForm = ({onSubmit}: Props) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
  });
  const { t } = useTranslation('forgot-password', { keyPrefix: 'form' });
  const { t: mainT } = useTranslation('main', { keyPrefix: 'errors' });
  const [serverError, setServerError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const requestNewPasswordResponse = await authenticationService.requestNewPassword(
      {
        email: data.email,
      }
    );

    setIsLoading(false);

    if (requestNewPasswordResponse instanceof ServiceError) {
      const errorCode = requestNewPasswordResponse.composedError.code;
      switch (errorCode) {
        case 'invalid_request_params':
          setServerError(t('errors.incorrect_credentials'));
          break;
        default:
          setServerError(mainT('somethingWentWrong'));
          break;
      }
    } else {
      // Success response
      onSubmit(data.email);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="forgotPasswordForm" autoComplete="off">
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('email.label')}
            placeholder={t('email.placeholder')}
            variant="outlined"
            fullWidth
            error={!!errors.email}
            helperText={errors?.email?.message ? t(errors.email.message) : ''}
          />
        )}
      />
      {serverError && <Alert severity="error">{serverError}</Alert>}
      <LoadingButton
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        loading={isLoading}
        disabled={isLoading}
        loadingPosition={'end'}
      >
        {t('submitBtnTitle')}
      </LoadingButton>
    </form>
  );
}

export default ForgotPasswordForm;