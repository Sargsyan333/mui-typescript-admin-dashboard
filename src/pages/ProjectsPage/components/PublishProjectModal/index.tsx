import React, { useState } from 'react';
import { Alert, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import ConfirmationDialog from 'components/ConfirmationDialog';
import { ServiceError } from 'services/helperTypes';
import { useSnackbarContext } from 'providers/Snackbar';
import { projectService } from 'services';

type Props = {
  projectId: string;
  onClose: (isPublished?: boolean) => void;
};

const PublishProjectModal: React.FC<Props> = ({
  projectId,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { t } = useTranslation('projects', { keyPrefix: 'publishModal' });
  const { t: mainT } = useTranslation('main', { keyPrefix: 'errors' });

  const { setSnackbarOpen, setSnackbarMessage } = useSnackbarContext();

  const onSubmit = async () => {
    setIsLoading(true);

    const publishResponse = await projectService.publish(projectId);
    const isPublished = !(publishResponse instanceof ServiceError);

    setIsLoading(false);
    onClose(isPublished);

    if (isPublished) {
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

export default PublishProjectModal;
