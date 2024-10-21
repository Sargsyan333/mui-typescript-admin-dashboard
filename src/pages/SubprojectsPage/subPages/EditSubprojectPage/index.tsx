import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';

import BackBtn from 'components/BackBtn';
import EditSubprojectForm from 'pages/SubprojectsPage/subPages/EditSubprojectPage/components/EditSubprojectForm';

const EditSubprojectPage = () => {
  const { t } = useTranslation('subprojects', { keyPrefix: 'updateSubproject' });

  const params = useParams();
  const subprojectId = params.id || '';

  const { state } = useLocation();

  return (
    <Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <h2>{t('title')}</h2>
        <BackBtn link={'/subprojects'} />
      </Box>
      <EditSubprojectForm
        subprojectId={subprojectId}
        subprojectData={state}
      />
    </Box>
  );
}

export default EditSubprojectPage;