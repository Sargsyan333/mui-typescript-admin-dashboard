import { useTranslation } from 'react-i18next';
import PublishIcon from '@mui/icons-material/Publish';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import React from 'react';

import TableActionButton from 'components/TableActionButton';
import { ProjectStatus } from 'types/projects';

type Props = {
  status: ProjectStatus;
  rowId: string;
  onPublish: (itemId: string) => void;
  onUnpublish: (itemId: string) => void;
};

const StatusChangeButton = ({status, rowId, onPublish, onUnpublish}: Props) => {
  const { t } = useTranslation('montage-jobs', { keyPrefix: 'table.actionButtons' });

  return status === ProjectStatus.draft ?
    (
      <TableActionButton
        title={t('publish')}
        icon={<PublishIcon />}
        onClick={() => onPublish(rowId)}
      />
    ) :
    (
      <TableActionButton
        title={t('unpublish')}
        icon={<UnpublishedIcon />}
        onClick={() => onUnpublish(rowId)}
      />
    )
}

export default StatusChangeButton;