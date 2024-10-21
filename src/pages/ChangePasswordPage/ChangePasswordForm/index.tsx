import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Alert, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';

import { userService } from 'services';
import { ServiceError } from 'services/helperTypes';

import 'pages/ChangePasswordPage/ChangePasswordForm/styles.css';
import ChangePasswordSchema from 'pages/ChangePasswordPage/ChangePasswordForm/validationSchema';

type Props = {
  onSubmit: () => void;
}

const ChangePasswordForm = ({onSubmit}: Props) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(ChangePasswordSchema),
  });
  const { t } = useTranslation('change-password', { keyPrefix: 'form' });
  const { t: mainT } = useTranslation('main', { keyPrefix: 'errors' });

  const [serverError, setServerError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const changePasswordResponse = await userService.changePassword(
      {
        old_password: data.oldPassword,
        new_password: data.newPassword,
      }
    );

    setIsLoading(false);

    if (changePasswordResponse instanceof ServiceError) {
      const errorCode = changePasswordResponse.composedError.code;
      if (errorCode === "wrong_password") {
        setServerError(t("errors.wrong_current_password"));
      } else {
        setServerError(mainT('somethingWentWrong'));
      }
    } else {
      // Success response
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="changePasswordForm" autoComplete="off">
      <Controller
        name="oldPassword"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('oldPassword.label')}
            variant="outlined"
            fullWidth
            type="password"
            error={!!errors.oldPassword}
            helperText={errors?.oldPassword?.message ? t(errors.oldPassword.message) : ''}
          />
        )}
      />
      <Controller
        name="newPassword"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('newPassword.label')}
            variant="outlined"
            fullWidth
            type="password"
            error={!!errors.newPassword}
            helperText={errors?.newPassword?.message ? t(errors.newPassword.message) : ''}
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

export default ChangePasswordForm;