import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import React from 'react';

type Props = {
  name: string;
  options: { value: string, label: string }[];
  label: string;
  errorMessage?: string;
  styles?: Record<string, unknown>;
}

const SelectInput = ({name, options, errorMessage, label, styles}: Props) => (
    <FormControl error={!!errorMessage} sx={styles}>
      <InputLabel id={`${name}-select-label`}>
        {label}
      </InputLabel>
      <Select
        variant="outlined"
        id={`${name}-select`}
        labelId={`${name}-select-label`}
        label={label}
      >
        {
          options.map((option) =>
            <MenuItem key={`${name}-${option.value}`} value={option.value}>
              {option.label}
            </MenuItem>
          )
        }
      </Select>
      {
        errorMessage &&
        <FormHelperText>{errorMessage}</FormHelperText>
      }
    </FormControl>
)

export default SelectInput;