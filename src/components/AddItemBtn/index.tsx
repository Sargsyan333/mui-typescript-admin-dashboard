import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from '@mui/material';

import { btnStyles } from 'components/AddItemBtn/styles';


type Props = {
  title: string;
  link: string;
}

const AddItemBtn = ({title, link}: Props) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(link);
  };

  return (
    <Link component="button" onClick={onClick} underline="none" sx={btnStyles}>
      <AddCircleOutlineIcon /> {title}
    </Link>
  );
};

export default AddItemBtn;
