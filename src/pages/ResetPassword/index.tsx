import { Box, Link, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { resetPasswordPageStyles } from 'pages/ResetPassword/styles';
import ResetPasswordForm from 'pages/ResetPassword/ResetPasswordForm';
import PageTitle from 'components/PageTitle';

const ResetPassword = () => {
  const [searchParams, ] = useSearchParams();
  const passwordResetCode = searchParams.get('code');

  const { t } = useTranslation('reset-password');

  const [isPasswordReset, setIsPasswordReset] = useState<boolean>(false);

  if (!passwordResetCode) {
    return <></>;
  }

  const onSubmit = () => {
    setIsPasswordReset(true);
  };

  return (
    <Box sx={resetPasswordPageStyles}>
      <Box className="innerContent">
        <PageTitle className="title">{t('title')}</PageTitle>
        {
          isPasswordReset ?
            <Typography>
              <Trans
                t={t}
                i18nKey={"passwordResetMessage"}
                components={[<Link href="/login" key="sign-in-link" />]}
              />
            </Typography> :
            <ResetPasswordForm
              passwordResetCode={passwordResetCode}
              onSubmit={onSubmit}
            />
        }
      </Box>
    </Box>
  )
}

export default ResetPassword;