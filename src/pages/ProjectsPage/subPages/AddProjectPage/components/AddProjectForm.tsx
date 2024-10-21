import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { projectService } from 'services';
import { ServiceError } from 'services/helperTypes';
import { useSnackbarContext } from 'providers/Snackbar';
import { ERROR_DUPLICATE_CODE, ERROR_DUPLICATE_NAME } from 'constants/apiErrors';
import ProjectForm from 'pages/ProjectsPage/components/ProjectForm';
import { ProjectEditableProps } from 'types/projects';

const AddProjectForm = () => {
  const navigate = useNavigate();
  const { t: mainT } = useTranslation('main');
  const { t } = useTranslation('projects');

  const { setSnackbarOpen, setSnackbarMessage } = useSnackbarContext();

  const [serverError, setServerError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (formData: ProjectEditableProps) => {
    setIsLoading(true);
    let clientId = '';
    if (formData.client?.value) {
      clientId = formData.client.value;
    }

    const response = await projectService.create({
      name: formData.name,
      code: formData.code,
      client_id: clientId,
      coworker_id: formData.coworker?.value,
    });

    setIsLoading(false);

    if (response instanceof ServiceError) {
      const errorCode = response.composedError.code;
      switch (errorCode) {
        case ERROR_DUPLICATE_NAME:
          setServerError(t('form.errors.duplicate_name'));
          break;
        case ERROR_DUPLICATE_CODE:
          setServerError(t('form.errors.duplicate_code'));
          break;
        default:
          setServerError(mainT('errors.somethingWentWrong'));
          break;
      }
    } else {
      setSnackbarOpen(true);
      setSnackbarMessage(t('addProject.success'));

      navigate('/projects');
    }
  }

  return <ProjectForm onSubmit={onSubmit} submitError={serverError} isLoading={isLoading} />
}

export default AddProjectForm;