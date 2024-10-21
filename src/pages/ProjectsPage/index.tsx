import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import AddItemBtn from 'components/AddItemBtn';
import ProjectsList from 'pages/ProjectsPage/components/ProjectsList';
import PageTitle from 'components/PageTitle';

const ProjectsPage = () => {
  const { t } = useTranslation('projects');

  return (
    <Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <PageTitle>{t('title')}</PageTitle>
        <AddItemBtn title={t('addProjectLink')} link={'/projects/add'} />
      </Box>
      <ProjectsList />
    </Box>
  )
}

export default ProjectsPage;