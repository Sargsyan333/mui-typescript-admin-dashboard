import React from 'react';
import { TextFieldProps } from '@mui/material/TextField/TextField';

import SelectWithSearch from 'components/SelectWithSearch';
import { SearchedValueType } from 'types/generic';
import { projectService } from 'services';
import { SearchProjectListQueryParams } from 'services/models/Projects';
import { ServiceError } from 'services/helperTypes';

const searchProjectsRequest = async (searchString: string, callback: (results?: readonly SearchedValueType[]) => void) => {
  const searchResponse = await projectService.search(new SearchProjectListQueryParams(searchString));
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

const ProjectSelectWithSearch = (
  {placeholder, noOptionsText, fieldProps, errorMessage}: Props
) => (
    <SelectWithSearch
      textFieldProps={fieldProps}
      searchRequest={searchProjectsRequest}
      placeholder={placeholder}
      noOptionsText={noOptionsText}
      error={!!errorMessage}
      helperText={errorMessage}
    />
)

export default ProjectSelectWithSearch;