import { Alert, Box } from '@mui/material';
import React, { ReactNode } from 'react';

import { formStyles } from 'components/MainForm/styles';
import FormFooter from 'components/FormFooter';

type Props = {
  children: ReactNode;
  submitError?: string;
  isSubmitBtnDisabled: boolean;
  onSubmit: () => void;
  cancelLink: string;
  isLoading: boolean;
}

const MainForm = ({children, submitError, isSubmitBtnDisabled, onSubmit, cancelLink, isLoading}: Props) => (
  <Box component="form" onSubmit={onSubmit} sx={formStyles} autoComplete="off">
    {children}
    {submitError && (
      <Alert severity="error">{submitError}</Alert>
    )}
    <FormFooter cancelLink={cancelLink} isSubmitBtnDisabled={isSubmitBtnDisabled} isLoading={isLoading} />
  </Box>
);

export default MainForm;