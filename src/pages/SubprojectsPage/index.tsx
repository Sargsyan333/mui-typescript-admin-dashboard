import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import AddItemBtn from 'components/AddItemBtn';
import SubprojectsList from 'pages/SubprojectsPage/components/SubprojectsList';
import PageTitle from 'components/PageTitle';

const SubprojectsPage = () => {
  const { t } = useTranslation('subprojects');

  return (
    <Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <PageTitle>{t('title')}</PageTitle>
        <AddItemBtn title={t('addSubprojectLink')} link={'/subprojects/add'} />
      </Box>
      <SubprojectsList />
    </Box>
  )
}

export default SubprojectsPage;