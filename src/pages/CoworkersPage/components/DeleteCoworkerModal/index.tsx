import React, { useState } from 'react';
import { Alert, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import ConfirmationDialog from 'components/ConfirmationDialog';
import { ServiceError } from 'services/helperTypes';
import { coworkerService } from 'services';
import { useSnackbarContext } from 'providers/Snackbar';

type DeleteCoworkerModalProps = {
  coworkerId: string;
  onClose: (isDeleted?: boolean) => void;
};

const DeleteCoworkerModal: React.FC<DeleteCoworkerModalProps> = ({
  coworkerId,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { t: mainT } = useTranslation('main', { keyPrefix: 'deleteModal' });
  const { t } = useTranslation('coworkers', { keyPrefix: 'deleteModal' });

  const { setSnackbarOpen, setSnackbarMessage } = useSnackbarContext();

  const onSubmit = async () => {
    setIsLoading(true);

    const deleteResponse = await coworkerService.delete(coworkerId);
    setIsLoading(false);

    const isDeleted = !(deleteResponse instanceof ServiceError);
    if (isDeleted) {
      setSnackbarMessage(
        <Alert severity="success">
          {t('successMessage')}
        </Alert>,
      );
    } else {
      setSnackbarMessage(
        <Alert severity="error">
          {mainT('somethingWentWrong')}
        </Alert>,
      );
    }

    setSnackbarOpen(true);
    onClose(isDeleted);
  };

  return (
    <ConfirmationDialog
      title={t('title')}
      cancelText={mainT('cancelText')}
      confirmText={mainT('confirmText')}
      content={<Typography>{t('content')}</Typography>}
      onSubmit={onSubmit}
      onClose={onClose}
      isLoading={isLoading}
    />
  );
};

export default DeleteCoworkerModal;
