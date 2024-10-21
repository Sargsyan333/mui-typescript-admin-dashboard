import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import BackBtn from 'components/BackBtn';
import AddProjectForm from 'pages/ProjectsPage/subPages/AddProjectPage/components/AddProjectForm';

const AddProjectPage = () => {
  const { t } = useTranslation('projects', { keyPrefix: 'addProject' });

  return (
    <Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <h2>{t('title')}</h2>
        <BackBtn link={'/projects'} />
      </Box>
      <AddProjectForm />
    </Box>
  );
}

export default AddProjectPage;