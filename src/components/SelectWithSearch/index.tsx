import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';
import { useEffect, useMemo, useState } from 'react';
import { TextFieldProps } from '@mui/material/TextField/TextField';

import { SearchedValueType } from 'types/generic';
import { autoCompleteStyles } from 'components/SelectWithSearch/styles';

type Props = {
  searchRequest: (
    input: string,
    callback: (results?: readonly SearchedValueType[]) => void
  ) => void;
  noOptionsText: string;
  placeholder: string;
  textFieldProps: TextFieldProps;
  error?: boolean;
  helperText?: string;
}

const SelectWithSearch = ({
  searchRequest,
  noOptionsText,
  placeholder,
  textFieldProps,
  error,
  helperText
}: Props) => {
  const initialValue = (textFieldProps.value as SearchedValueType) || null;
  const [value, setValue] = useState<SearchedValueType | null>(initialValue);
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<readonly SearchedValueType[]>([]);

  const fetch = useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly SearchedValueType[]) => void,
        ) => {
          searchRequest(request.input, callback);
        },
        400,
      ),
    [],
  );

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly SearchedValueType[]) => {
      if (active) {
        let newOptions: readonly SearchedValueType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      sx={autoCompleteStyles}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.name
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText={noOptionsText}
      onChange={(event: any, newValue: SearchedValueType | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        textFieldProps?.onChange(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          name={textFieldProps.name}
          label={placeholder}
          fullWidth
          error={error}
          helperText={helperText}
        />
      )}
      renderOption={(props, option) => {
        // eslint-disable-next-line react/prop-types
        const { key, ...optionProps } = props;

        return (
          <li key={`option-${option.value}`} {...optionProps}>
            <Box sx={{ alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {option.name}
              </Typography>
            </Box>
          </li>
        )
      }}
    />
  );
}

export default SelectWithSearch;
