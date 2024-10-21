import { Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

import LoginForm from 'pages/Login/components/LoginForm';

import 'pages/Login/styles.css';
import PageTitle from 'components/PageTitle';

const Login = () => {
  const { t } = useTranslation('login');

  return (
    <div className="loginPage">
      <PageTitle className="loginFormTitle">{t('title')}</PageTitle>
      <LoginForm />
      <div className="loginPageFooter">
        <Link href="/forgot-password">{t('footerLink')}</Link>
      </div>
    </div>
  )
}

export default Login;