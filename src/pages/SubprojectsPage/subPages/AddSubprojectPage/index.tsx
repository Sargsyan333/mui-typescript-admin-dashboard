import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import BackBtn from 'components/BackBtn';
import AddSubprojectForm from 'pages/SubprojectsPage/subPages/AddSubprojectPage/components/AddSubprojectForm';

const AddSubprojectPage = () => {
  const { t } = useTranslation('subprojects', { keyPrefix: 'addSubproject' });

  return (
    <Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <h2>{t('title')}</h2>
        <BackBtn link={'/subprojects'} />
      </Box>
      <AddSubprojectForm />
    </Box>
  );
}

export default AddSubprojectPage;