import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import PageTitle from 'components/PageTitle';
import { changePasswordPageStyles } from 'pages/ChangePasswordPage/styles';
import ChangePasswordForm from 'pages/ChangePasswordPage/ChangePasswordForm';

const ChangePasswordPage = () => {
  const { t } = useTranslation('change-password');

  const [isPasswordChanged, setIsPasswordChanged] = useState<boolean>(false);

  const onSubmit = () => {
    setIsPasswordChanged(true);
  };

  return (
    <Box sx={changePasswordPageStyles}>
      <Box className="innerContent">
        <PageTitle className="title">{t('title')}</PageTitle>
        {
          isPasswordChanged ?
            <Typography>
              {t('passwordChangedMessage')}
            </Typography> :
            <ChangePasswordForm onSubmit={onSubmit} />
        }
      </Box>
    </Box>
  )
}

export default ChangePasswordPage;