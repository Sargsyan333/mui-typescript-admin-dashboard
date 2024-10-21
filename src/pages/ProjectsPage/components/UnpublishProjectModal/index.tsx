import React, { useState } from 'react';
import { Alert, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import ConfirmationDialog from 'components/ConfirmationDialog';
import { ServiceError } from 'services/helperTypes';
import { projectService } from 'services';
import { useSnackbarContext } from 'providers/Snackbar';

type Props = {
  projectId: string;
  onClose: (isUnpublished?: boolean) => void;
};

const UnpublishProjectModal: React.FC<Props> = ({
  projectId,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { t } = useTranslation('projects', { keyPrefix: 'unpublishModal' });
  const { t: mainT } = useTranslation('main', { keyPrefix: 'errors' });

  const { setSnackbarOpen, setSnackbarMessage } = useSnackbarContext();

  const onSubmit = async () => {
    setIsLoading(true);

    const unpublishResponse = await projectService.unpublish(projectId);
    const isUnpublished = !(unpublishResponse instanceof ServiceError);

    setIsLoading(false);
    onClose(isUnpublished);

    if (isUnpublished) {
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
  };

  return (
    <ConfirmationDialog
      title={t('title')}
      cancelText={t('cancelText')}
      confirmText={t('confirmText')}
      content={<Typography>{t('content')}</Typography>}
      onSubmit={onSubmit}
      onClose={onClose}
      isLoading={isLoading}
    />
  );
};

export default UnpublishProjectModal;
