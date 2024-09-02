import i18n from 'i18next'
import { en, pl } from "./translations";
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from "expo-localization";

const resources = {
    pl: {
        translation: pl,
    },
    en: {
        translation: en,
    }
}

const initI18n = async () => {
    let savedLanguage = await AsyncStorage.getItem("language");
  
    if (!savedLanguage) {
      savedLanguage = Localization.locale;
    }
  
    i18n.use(initReactI18next).init({
      compatibilityJSON: "v3",
      resources,
      lng: savedLanguage,
      fallbackLng: "pl",
      interpolation: {
        escapeValue: false,
      },
    });
  };
  
  initI18n();


export default i18n