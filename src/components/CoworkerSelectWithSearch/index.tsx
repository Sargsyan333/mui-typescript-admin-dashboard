import React from 'react';
import { TextFieldProps } from '@mui/material/TextField/TextField';

import SelectWithSearch from 'components/SelectWithSearch';
import { SearchedValueType } from 'types/generic';
import { coworkerService } from 'services';
import { ServiceError } from 'services/helperTypes';
import { SearchCoworkerListQueryParams } from 'services/models/Coworkers';

const searchCoworkersRequest = async (searchString: string, callback: (results?: readonly SearchedValueType[]) => void) => {
  const searchResponse = await coworkerService.search(new SearchCoworkerListQueryParams(searchString));
  if (searchResponse instanceof ServiceError) {
    callback([]);
    return;
  }

  callback(searchResponse.items);
}

type Props = {
  placeholder: string;
  noOptionsText: string;
  fieldProps: TextFieldProps;
  errorMessage?: string;
}

const CoworkerSelectWithSearch = (
  {placeholder, noOptionsText, fieldProps, errorMessage}: Props
) => (
  <SelectWithSearch
    textFieldProps={fieldProps}
    searchRequest={searchCoworkersRequest}
    placeholder={placeholder}
    noOptionsText={noOptionsText}
    error={!!errorMessage}
    helperText={errorMessage}
  />
)

export default CoworkerSelectWithSearch;