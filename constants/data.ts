import { ExpensesTypes} from "@/types";
import { useTranslation } from "react-i18next";
import { Dimensions } from "react-native";
import i18n from "@/i18n/i18n";


//inputs:
const { width, height } = Dimensions.get("window");
export const elementWidth = height / 2.7;
export const elementHeight = height / 19;
export const buttonSize = height / 12;
export const borderWidth = 0.4;
export const borderRadius = 10;

export const modalBorderRadius = 20;
// const {t} = useTranslation()
export const typesOfExpense: ExpensesTypes[] = [
	{
		title: i18n.t("constantData.dropDownData.title.groceries"),
		icon: require("@/assets/images/shopping-cart.png"),
		color: "#3a86ff",
	},
	{
		title: i18n.t("constantData.dropDownData.title.fuel"),
		icon: require("@/assets/images/gas-station.png"),
		color: "#8338ec",
	},
	{
		title: "Wynajem",
		icon: require("@/assets/images/rent.png"),
		color: "#ff006e",
	},
	{
		title: "Restauracja",
		icon: require("@/assets/images/restaurant.png"),
		color: "#fb5607",
	},
	{
		title: "Siłownia",
		icon: require("@/assets/images/gym.png"),
		color: "#ffbe0b",
	},
	{
		title: "Wakacje",
		icon: require("@/assets/images/shopping-cart.png"),
		color: "#22577a",
	},
	{
		title: "Prezent",
		icon: require("@/assets/images/gift.png"),
		color: "#38a3a5",
	},
	{
		title: "Rozrywka",
		icon: require("@/assets/images/shopping-cart.png"),
		color: "#57cc99",
	},
	{
		title: "Kredyt",
		icon: require("@/assets/images/shopping-cart.png"),
		color: "#80ed99",
	},
	{
		title: "Czynsz i media",
		icon: require("@/assets/images/shopping-cart.png"),
		color: "#c7f9cc",
	},
	{
		title: "Inne",
		icon: require("@/assets/images/shopping-cart.png"),
		color: "#b5e2fa",
	},
];

export const typesOfIncome: ExpensesTypes[] = [
	{
		title: "Pensja",
		color: "#f95738",
		icon: require("@/assets/images/shopping-cart.png"),
	},
	{
		title: "Prezent",
		color: "##ee964b",
		icon: require("@/assets/images/shopping-cart.png"),
	},
	{
		title: "Sprzedaz",
		color: "#f4d35e",
		icon: require("@/assets/images/shopping-cart.png"),
	},
	{
		title: "Bonus",
		color: "#faf0ca",
		icon: require("@/assets/images/shopping-cart.png"),
	},
	{
		title: "Premia",
		color: "#0d3b66",
		icon: require("@/assets/images/shopping-cart.png"),
	},
	{
		title: "Inne",
		color: "#81b29a",
		icon: require("@/assets/images/shopping-cart.png"),
	},
];
