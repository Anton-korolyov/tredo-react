import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import ru from "./ru.json";
import he from "./he.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      he: { translation: he }
    },
    lng: localStorage.getItem("lang") || "he",
    fallbackLng: "he",
    interpolation: { escapeValue: false }
  });

export default i18n;
