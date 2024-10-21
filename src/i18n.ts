import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

import { DEFAULT_LANGUAGE_CODE } from 'constants/languages';
import { languageKey } from 'constants/localStorage';

const selectedLanguage = window.localStorage.getItem(languageKey);

i18n
  .use(initReactI18next)
  .use(Backend)
  .init({
    fallbackLng: DEFAULT_LANGUAGE_CODE,
    lng: selectedLanguage ? JSON.parse(selectedLanguage) : DEFAULT_LANGUAGE_CODE,
    react: {
      useSuspense: true,
    },
  });

export default i18n;
