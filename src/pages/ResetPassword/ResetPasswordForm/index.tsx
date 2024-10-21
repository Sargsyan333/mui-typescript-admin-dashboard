import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Alert, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';

import { authenticationService } from 'services';
import { ServiceError } from 'services/helperTypes';
import ResetPasswordSchema from 'pages/ResetPassword/ResetPasswordForm/validationSchema';

import 'pages/ResetPassword/ResetPasswordForm/styles.css';

type Props = {
  passwordResetCode: string;
  onSubmit: () => void;
}

const ResetPasswordForm = ({passwordResetCode, onSubmit}: Props) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(ResetPasswordSchema),
  });
  const { t } = useTranslation('reset-password', { keyPrefix: 'form' });
  const [serverError, setServerError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const resetPasswordResponse = await authenticationService.resetPassword(
      {
        code: passwordResetCode,
        new_password: data.password,
      }
    );

    setIsLoading(false);

    if (resetPasswordResponse instanceof ServiceError) {
      setServerError('Something went wrong. Please try later!');
    } else {
      // Success response
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="resetPasswordForm" autoComplete="off">
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('password.label')}
            variant="outlined"
            fullWidth
            type="password"
            error={!!errors.password}
            helperText={errors?.password?.message ? t(errors.password.message) : ''}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('confirmPassword.label')}
            variant="outlined"
            fullWidth
            type="password"
            error={!!errors.confirmPassword}
            helperText={errors?.confirmPassword?.message ? t(errors.confirmPassword.message) : ''}
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

export default ResetPasswordForm;