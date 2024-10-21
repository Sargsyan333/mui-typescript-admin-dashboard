import { useState } from 'react';
import { Box, Link, Typography } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';

import ForgotPasswordForm from 'pages/ForgotPassword/components/ForgotPasswordForm';
import { forgotPasswordPageStyles } from 'pages/ForgotPassword/styles';
import PageTitle from 'components/PageTitle';

const ForgotPassword = () => {
  const { t } = useTranslation('forgot-password');

  const [passwordRestoreEmail, setPasswordRestoreEmail] = useState<string>('');

  const onFormSubmit = (email: string) => {
    setPasswordRestoreEmail(email);
  };

  return (
    <Box className="forgotPasswordPage" sx={forgotPasswordPageStyles}>
      <Box className="innerContent">
        <PageTitle className="title">{t('title')}</PageTitle>
        {
          passwordRestoreEmail ?
            <Typography className="passwordRestoredMessage">
              <Trans
                t={t}
                i18nKey="passwordRestoredMessage"
                values={{
                  email: passwordRestoreEmail
                }}
                components={[<Typography className="highlightedEmail" component="span" key={'highlightedEmail'} />]}
              />
            </Typography> :
            <ForgotPasswordForm onSubmit={onFormSubmit} />
        }
        <div className="pageFooter">
          <Link href="/login">{t('footerLink')}</Link>
        </div>
      </Box>
    </Box>
  )
};

export default ForgotPassword;