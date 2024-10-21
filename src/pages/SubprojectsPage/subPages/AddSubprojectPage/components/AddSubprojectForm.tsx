import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { subprojectService } from 'services';
import { ServiceError } from 'services/helperTypes';
import { useSnackbarContext } from 'providers/Snackbar';
import { ERROR_DUPLICATE_CODE } from 'constants/apiErrors';
import { SubprojectEditableProps } from 'types/subprojects';
import SubprojectForm from 'pages/SubprojectsPage/components/SubprojectForm';

const AddSubprojectForm = () => {
  const navigate = useNavigate();
  const { t: mainT } = useTranslation('main');
  const { t } = useTranslation('subprojects');

  const { setSnackbarOpen, setSnackbarMessage } = useSnackbarContext();

  const [serverError, setServerError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (formData: SubprojectEditableProps) => {
    setIsLoading(true);
    let projectId = '';
    if (formData.project?.value) {
      projectId = formData.project.value;
    }

    const response = await subprojectService.create({
      code: formData.code,
      project_id: projectId,
      coworker_id: formData.coworker?.value,
    });

    setIsLoading(false);

    if (response instanceof ServiceError) {
      const errorCode = response.composedError.code;
      switch (errorCode) {
        case ERROR_DUPLICATE_CODE:
          setServerError(t('form.errors.duplicate_code'));
          break;
        default:
          setServerError(mainT('errors.somethingWentWrong'));
          break;
      }
    } else {
      setSnackbarOpen(true);
      setSnackbarMessage(t('addSubproject.success'));

      navigate('/subprojects');
    }
  }

  return <SubprojectForm onSubmit={onSubmit} submitError={serverError} isLoading={isLoading} />
}

export default AddSubprojectForm;