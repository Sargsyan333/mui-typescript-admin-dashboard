import { Box, CircularProgress } from '@mui/material';
import React from 'react';

import { wrapperStyles } from 'components/LoadingSpinner/styles';

const LoadingSpinner = () => (
  <Box sx={wrapperStyles}>
    <CircularProgress />
  </Box>
);

export default LoadingSpinner;
