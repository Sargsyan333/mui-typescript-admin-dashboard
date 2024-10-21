import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import AddItemBtn from 'components/AddItemBtn';
import ClientList from 'pages/ClientsPage/components/ClientList';
import PageTitle from 'components/PageTitle';

const ClientsPage = () => {
  const { t } = useTranslation('clients');

  return (
    <Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <PageTitle>{t('title')}</PageTitle>
        <AddItemBtn title={t('addClientLink')} link={'/clients/add'} />
      </Box>
      <ClientList />
    </Box>
  )
}

export default ClientsPage;