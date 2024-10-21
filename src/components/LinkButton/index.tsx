import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Props = {
  title: string;
  link: string;
}

const LinkButton = ({title, link}: Props) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(link);
  }

  return (
    <Link component="button" underline="none" onClick={onClick}>
      {title}
    </Link>
  )
}

export default LinkButton;