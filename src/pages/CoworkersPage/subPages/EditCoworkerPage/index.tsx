import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';

import BackBtn from 'components/BackBtn';
import EditCoworkerForm from 'pages/CoworkersPage/subPages/EditCoworkerPage/components/EditCoworkerForm';

const EditCoworkerPage = () => {
  const { t } = useTranslation('coworkers', { keyPrefix: 'updateCoworker' });

  const params = useParams();
  const coworkerId = params.id || '';

  const { state } = useLocation();

  return (
    <Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <h2>{t('title')}</h2>
        <BackBtn link={'/coworkers'} />
      </Box>
      <EditCoworkerForm coworkerId={coworkerId} coworkerData={state} />
    </Box>
  );
}

export default EditCoworkerPage;