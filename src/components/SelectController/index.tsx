import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';
import React from 'react';
import { Control } from 'react-hook-form/dist/types/form';

type Props = {
  name: string;
  control: Control<any, any>,
  options: { value: string, label: string }[];
  label: string;
  errorMessage?: string;
  styles?: Record<string, unknown>;
}

const SelectController = ({name, control, options, errorMessage, label, styles}: Props) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl error={!!errorMessage} sx={styles}>
          <InputLabel id={`${name}-select-label`}>
            {label}
          </InputLabel>
          <Select
            {...field}
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
      )}
    />
  )

export default SelectController;