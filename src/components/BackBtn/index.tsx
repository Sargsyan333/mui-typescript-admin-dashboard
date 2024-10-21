import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { btnStyles } from 'components/AddItemBtn/styles';


type Props = {
  link: string;
}

const BackBtn = ({link}: Props) => {
  const navigate = useNavigate();

  const { t } = useTranslation('main')

  const onClick = () => {
    navigate(link);
  };

  return (
    <Link component="button" onClick={onClick} underline="none" sx={btnStyles}>
      <ArrowBackIcon /> {t('backBtn')}
    </Link>
  );
};

export default BackBtn;
