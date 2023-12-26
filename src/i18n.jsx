import i18n from "i18next";
// import Backend from 'i18next-http-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from "./locales/en/translation.json";
import translationES from "./locales/es/translation.json";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
};

i18n
  .use(initReactI18next)
  // .use(Backend)
  // .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: "es",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
