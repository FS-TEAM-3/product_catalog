// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import en from './locales/en.json';
// import uk from './locales/uk.json';

// i18n.use(initReactI18next).init({
//   resources: {
//     en: { translation: en },
//     uk: { translation: uk },
//   },
//   lng: 'en',
//   fallbackLng: 'en',
//   interpolation: {
//     escapeValue: false,
//   },
// });

// export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import uk from './locales/uk.json';

i18n
  .use(LanguageDetector) // додаємо детектор
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      uk: { translation: uk },
    },
    fallbackLng: 'en',
    detection: {
      // спочатку дивимося в localStorage, потім в навігаторі
      order: ['localStorage', 'navigator'],
      // кешуємо вибір у localStorage
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

export default i18n;
