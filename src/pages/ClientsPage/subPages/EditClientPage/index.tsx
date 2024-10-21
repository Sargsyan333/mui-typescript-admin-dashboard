import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';

import BackBtn from 'components/BackBtn';
import EditClientForm from 'pages/ClientsPage/subPages/EditClientPage/components/EditClientForm';

const EditClientPage = () => {
  const { t } = useTranslation('clients', { keyPrefix: 'updateClient' });

  const params = useParams();
  const clientId = params.id || '';

  const { state } = useLocation();

  return (
    <Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <h2>{t('title')}</h2>
        <BackBtn link={'/clients'} />
      </Box>
      <EditClientForm clientId={clientId} clientData={state} />
    </Box>
  );
}

export default EditClientPage;