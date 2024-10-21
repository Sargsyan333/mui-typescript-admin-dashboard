import { Typography } from '@mui/material';
import React from 'react';

type Props = {
  title: string;
}

const FormGroupTitle = ({title}: Props) =>
  <Typography component="h4" m={0} fontWeight="bold">{title}</Typography>

export default FormGroupTitle;