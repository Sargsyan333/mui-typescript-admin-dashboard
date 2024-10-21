import { TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import React, { useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import { ProjectEditableProps } from 'types/projects';
import ProjectFormValidationSchema, {
  CODE_LENGTH,
  NAME_MAX_LENGTH,
} from 'pages/ProjectsPage/components/ProjectForm/validationSchema';
import SelectWithSearch from 'components/SelectWithSearch';
import { SearchedValueType } from 'types/generic';
import { clientService } from 'services';
import { ServiceError } from 'services/helperTypes';
import { SearchClientListQueryParams } from 'services/models/Clients';
import MainForm from 'components/MainForm';
import CoworkerSelectWithSearch from 'components/CoworkerSelectWithSearch';

type Props = {
  onSubmit: (newData: ProjectEditableProps, isDataChanged: boolean) => void;
  currentData?: ProjectEditableProps | null;
  submitError?: string;
  isLoading: boolean;
};

const defaultFormValuesInitialState: ProjectEditableProps = {
  name: '',
  code: '',
  client: {name: '', value: ''},
  coworker: null,
};

const ProjectForm: React.FC<Props> = ({
   onSubmit,
   submitError,
   currentData,
   isLoading,
}) => {
  let defaultFormValues = defaultFormValuesInitialState;
  if (currentData) {
    defaultFormValues = {
      name: currentData.name,
      code: currentData.code,
      client: currentData.client,
      coworker: currentData.coworker,
    };
  }

  const {
    handleSubmit,
    formState: { isDirty, errors },
    control,
  } = useForm({
    defaultValues: defaultFormValues,
    resolver: yupResolver(ProjectFormValidationSchema),
  });
  const { t } = useTranslation('projects', {keyPrefix: 'form'});

  const isSubmitBtnDisabled = Object.keys(errors).length > 0;

  const onFormSubmit = useCallback(
    (data: ProjectEditableProps) => {
      onSubmit(data, isDirty);
    },
    [onSubmit, isDirty],
  );

  const searchClientsRequest = async (searchString: string, callback: (results?: readonly SearchedValueType[]) => void) => {
    const searchResponse = await clientService.search(new SearchClientListQueryParams(searchString));
    if (searchResponse instanceof ServiceError) {
      callback([]);
      return;
    }

    callback(searchResponse.items);
  }

  return (
    <MainForm
      isSubmitBtnDisabled={isSubmitBtnDisabled}
      submitError={submitError}
      onSubmit={handleSubmit(onFormSubmit)}
      cancelLink='/projects'
      isLoading={isLoading}
    >
      <>
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('code.label')}
              variant="outlined"
              fullWidth
              error={!!errors.code}
              helperText={errors?.code?.message ? t(errors.code.message, { length: CODE_LENGTH }) : ''}
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('name.label')}
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors?.name?.message ? t(errors.name.message, { max: NAME_MAX_LENGTH }) : ''}
            />
          )}
        />
        <Controller
          name="client"
          control={control}
          render={({field}) => (
            <SelectWithSearch
              textFieldProps={field}
              searchRequest={searchClientsRequest}
              placeholder={t('client.placeholder')}
              noOptionsText={t('client.notFound')}
              error={!!errors.client}
              helperText={errors?.client?.message ? t(errors.client.message) : ''}
            />
          )}
        />
        <Controller
          name="coworker"
          control={control}
          render={({field}) => (
            <CoworkerSelectWithSearch
              placeholder={t('coworker.placeholder')}
              noOptionsText={t('coworker.notFound')}
              fieldProps={field}
            />
          )}
        />
      </>
    </MainForm>
  );
};

export default ProjectForm;
