import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/common.json';
import uk from './locales/uk/common.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en },
      uk: { common: uk }
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'uk'],
    defaultNS: 'common',
    ns: ['common'],
    interpolation: { escapeValue: false },
    nonExplicitSupportedLngs: true,
    detection: {
      order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;

// Keep the <html lang> attribute in sync for accessibility and SEO
if (typeof document !== 'undefined') {
  const setLang = (lng) => {
    document.documentElement.setAttribute('lang', lng || 'en');
  };
  setLang(i18n.resolvedLanguage);
  i18n.on('languageChanged', (lng) => setLang(lng));
}
