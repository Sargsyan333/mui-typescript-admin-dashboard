import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import BackBtn from 'components/BackBtn';
import AddClientForm from 'pages/ClientsPage/subPages/AddClientPage/components/AddClientForm';
import PageTitle from 'components/PageTitle';

const AddClientPage = () => {
  const { t } = useTranslation('clients', { keyPrefix: 'addClient' });

  return (
    <Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <PageTitle>{t('title')}</PageTitle>
        <BackBtn link={'/clients'} />
      </Box>
      <AddClientForm />
    </Box>
  );
}

export default AddClientPage;