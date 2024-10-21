import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ServiceError } from 'services/helperTypes';
import { useSnackbarContext } from 'providers/Snackbar';
import { ERROR_DUPLICATE_CODE } from 'constants/apiErrors';
import { subprojectService } from 'services';
import { SubprojectEditableProps } from 'types/subprojects';
import SubprojectForm from 'pages/SubprojectsPage/components/SubprojectForm';

type Props = {
  subprojectId: string;
  subprojectData: {
    name: string;
    code: string;
    projectId: string;
    projectName: string;
    coworkerId: string;
    coworkerName: string;
  };
}

const EditSubprojectForm = ({subprojectId, subprojectData}: Props) => {
  const navigate = useNavigate();
  const { t: mainT } = useTranslation('main');
  const { t } = useTranslation('subprojects');

  const { setSnackbarOpen, setSnackbarMessage } = useSnackbarContext();

  const [serverError, setServerError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (formData: SubprojectEditableProps) => {
    setIsLoading(true);
    const response = await subprojectService.update(
      subprojectId,
      {
        code: formData.code,
        project_id: formData.project.value,
        coworker_id: formData.coworker?.value,
      }
    );

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
      setSnackbarMessage(t('updateSubproject.success'));

      navigate('/subprojects');
    }
  }

  return (
    <SubprojectForm
      onSubmit={onSubmit}
      submitError={serverError}
      isLoading={isLoading}
      currentData={{
        code: subprojectData.code,
        project: {
          name: subprojectData.projectName,
          value: subprojectData.projectId,
        },
        coworker: subprojectData.coworkerId ? {
          name: subprojectData.coworkerName,
          value: subprojectData.coworkerId,
        } : null,
      }}
    />
  )
}

export default EditSubprojectForm;