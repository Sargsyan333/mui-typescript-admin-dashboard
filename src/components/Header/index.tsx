import { Box, Link } from '@mui/material';

import { headerStyles } from 'components/Header/styles';
import logo from 'components/Header/logo.jpg';
import LanguageMenu from 'components/Header/LanguageMenu';
import { useAuth } from 'providers/AuthContext';
import MyAccountMenu from 'components/Header/MyAccountMenu';

const Header = () => {
  const { userSignedIn } = useAuth();

  return (
    <Box component="header" sx={headerStyles}>
      <div className="innerContent">
        <div className="leftSection">
          <Link href="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
        </div>
        <div className="rightSection">
          <LanguageMenu />
          { userSignedIn && <MyAccountMenu /> }
        </div>
      </div>
    </Box>
  )

};

export default Header