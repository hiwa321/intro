import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import fi from "./fi.json";
import de from "./de.json";
import nl from "./nl.json";
import sv from "./sv.json";

const savedLang = localStorage.getItem("lang");

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fi: { translation: fi },
      de: { translation: de },
      nl: { translation: nl },
      sv: { translation: sv },
    },
    lng: savedLang || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
    returnEmptyString: false,
  });

export default i18n;
