import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';

import Header from 'components/Header';
import { useAuth } from 'providers/AuthContext';
import Sidebar from 'components/Sidebar';
import MainContent from 'components/MainContent';
import Snackbar from 'components/Snackbar';

const noAuthRoutes = [
  '/login',
  '/forgot-password',
  '/reset-password',
];

const Layout = () => {
  const location = useLocation();
  const { userSignedIn } = useAuth();

  if (noAuthRoutes.includes(location.pathname)) {
    if (userSignedIn) {
      return <Navigate to={'/'} replace />
    }
  } else if (!userSignedIn) {
    return <Navigate to={'/login'} replace />
  }

  return (
    <>
      <CssBaseline />
      <Header />
        {
          userSignedIn ?
            (
              <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <MainContent open>
                  <Outlet />
                </MainContent>
                <Snackbar />
              </Box>
            ) :
            (
              <Box component="main" sx={{marginTop: '78px'}}>
                <Outlet />
              </Box>
            )
        }
    </>
  )
}

export default Layout;