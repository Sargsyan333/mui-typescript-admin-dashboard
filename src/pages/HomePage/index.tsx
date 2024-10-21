import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation('main');

  return (
    <h1>{t('title')}</h1>
  )
};

export default HomePage