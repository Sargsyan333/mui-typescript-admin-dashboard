import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { clientService } from 'services';
import { ServiceError } from 'services/helperTypes';
import { useSnackbarContext } from 'providers/Snackbar';
import { ERROR_DUPLICATE_NAME } from 'constants/apiErrors';
import { ClientEditableProps } from 'types/clients';
import ClientForm from 'pages/ClientsPage/components/ClientForm';

const AddClientForm = () => {
  const navigate = useNavigate();
  const { t: mainT } = useTranslation('main');
  const { t } = useTranslation('clients');

  const { setSnackbarOpen, setSnackbarMessage } = useSnackbarContext();

  const [serverError, setServerError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (formData: ClientEditableProps) => {
    setIsLoading(true);

    const response = await clientService.create({
      name: formData.name,
    });

    setIsLoading(false);

    if (response instanceof ServiceError) {
      const errorCode = response.composedError.code;
      switch (errorCode) {
        case ERROR_DUPLICATE_NAME:
          setServerError(t('form.errors.duplicate_name'));
          break;
        default:
          setServerError(mainT('errors.somethingWentWrong'));
          break;
      }
    } else {
      setSnackbarOpen(true);
      setSnackbarMessage(t('addClient.success'));

      navigate('/clients');
    }
  }

  return <ClientForm onSubmit={onSubmit} submitError={serverError} isLoading={isLoading} />
}

export default AddClientForm;