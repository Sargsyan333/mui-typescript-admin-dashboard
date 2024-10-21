import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import AddCoworkerForm from 'pages/CoworkersPage/subPages/AddCoworkerPage/components/AddCoworkerForm';
import BackBtn from 'components/BackBtn';

const AddCoworkerPage = () => {
  const { t } = useTranslation('coworkers', { keyPrefix: 'addCoworker' });

  return (
    <Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <h2>{t('title')}</h2>
        <BackBtn link={'/coworkers'} />
      </Box>
      <AddCoworkerForm />
    </Box>
  );
}

export default AddCoworkerPage;