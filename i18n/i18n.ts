import i18n from "i18next";
import { en, pl } from "./translations";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { setDefaultOptions } from "date-fns";
import { getLocales } from "expo-localization";
import { enUS } from "date-fns/locale";

const locales = { pl, enUS };

const resources = {
	pl: {
		translation: pl,
	},
	enUS: {
		translation: en,
	},
};

const initI18n = async () => {
	let savedLanguage = await AsyncStorage.getItem("language");


	if (!savedLanguage) {
		savedLanguage = getLocales()[0].languageCode ?? "enUS";
		setDefaultOptions({ locale: locales["enUS"] });
	}

	i18n.use(initReactI18next).init({
		compatibilityJSON: "v3",
		resources,
		lng: savedLanguage,
		fallbackLng: "enUS",
		interpolation: {
			escapeValue: false,
		},
	});
};

initI18n();

export default i18n;
