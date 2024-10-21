import { Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';

import LinkButton from 'components/LinkButton';
import { formFooterStyles } from 'components/FormFooter/styles';

type Props = {
  cancelLink: string;
  isSubmitBtnDisabled: boolean;
  isLoading: boolean;
}

const FormFooter = ({cancelLink, isSubmitBtnDisabled, isLoading}: Props) => {
  const { t } = useTranslation('main', { keyPrefix: 'form' });

  return (
    <Box sx={formFooterStyles}>
      <Box>
        <LinkButton title={t('cancelBtn')} link={cancelLink} />
      </Box>
      <Box>
        <LoadingButton
          type="submit"
          variant="contained"
          fullWidth
          loading={isLoading}
          disabled={isLoading || isSubmitBtnDisabled}
          loadingPosition={'end'}
        >
          {t('submitBtn')}
        </LoadingButton>
      </Box>
    </Box>
  )
}

export default FormFooter;