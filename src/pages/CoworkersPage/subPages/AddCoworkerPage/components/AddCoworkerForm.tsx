import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import CoworkerForm from 'pages/CoworkersPage/components/CoworkerForm';
import { CoworkerEditableProps } from 'types/coworkers';
import { coworkerService } from 'services';
import { ServiceError } from 'services/helperTypes';
import { useSnackbarContext } from 'providers/Snackbar';
import { ERROR_DUPLICATE_EMAIL, ERROR_DUPLICATE_NAME } from 'constants/apiErrors';

const AddCoworkerForm = () => {
  const navigate = useNavigate();
  const { t: mainT } = useTranslation('main');
  const { t } = useTranslation('coworkers');

  const { setSnackbarOpen, setSnackbarMessage } = useSnackbarContext();

  const [serverError, setServerError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (formData: CoworkerEditableProps) => {
    setIsLoading(true);

    const response = await coworkerService.create({
      email: formData.emailAddress,
      company_name: formData.companyName,
    });

    setIsLoading(false);

    if (response instanceof ServiceError) {
      const errorCode = response.composedError.code;
      switch (errorCode) {
        case ERROR_DUPLICATE_NAME:
          setServerError(t('form.errors.duplicate_name'));
          break;
        case ERROR_DUPLICATE_EMAIL:
          setServerError(t('form.errors.duplicate_email'));
          break;
        default:
          setServerError(mainT('errors.somethingWentWrong'));
          break;
      }
    } else {
      setSnackbarOpen(true);
      setSnackbarMessage(t('addCoworker.success'));

      navigate('/coworkers');
    }
  }

  return <CoworkerForm onSubmit={onSubmit} submitError={serverError} isLoading={isLoading} />
}

export default AddCoworkerForm;