import React from 'react';
import { Typography } from '@mui/material';

import { messageStyles } from 'components/NoDataMessage/styles';

type NoDataMessageProps = {
  message: string;
};

const NoDataMessage: React.FC<NoDataMessageProps> = ({ message }) => (
  <Typography sx={messageStyles}>{message}</Typography>
);

export default NoDataMessage;
