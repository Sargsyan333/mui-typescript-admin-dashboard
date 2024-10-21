import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import CoworkerList from 'pages/CoworkersPage/components/CoworkerList';
import AddItemBtn from 'components/AddItemBtn';
import PageTitle from 'components/PageTitle';

const CoworkersPage = () => {
  const { t } = useTranslation('coworkers');

  return (
    <Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <PageTitle>{t('title')}</PageTitle>
        <AddItemBtn title={t('addCoworkerLink')} link={'/coworkers/add'} />
      </Box>
      <CoworkerList />
    </Box>
  )
}

export default CoworkersPage;