import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';

import BackBtn from 'components/BackBtn';
import EditProjectForm from 'pages/ProjectsPage/subPages/EditProjectPage/components/EditProjectForm';

const EditProjectPage = () => {
  const { t } = useTranslation('projects', { keyPrefix: 'updateProject' });

  const params = useParams();
  const projectId = params.id || '';

  const { state } = useLocation();

  return (
    <Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <h2>{t('title')}</h2>
        <BackBtn link={'/projects'} />
      </Box>
      <EditProjectForm
        projectId={projectId}
        projectData={state}
      />
    </Box>
  );
}

export default EditProjectPage;