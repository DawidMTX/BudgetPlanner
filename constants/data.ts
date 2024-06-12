import { ExpensesTypes, PieChartTypes } from "@/types";
import { PieChartPropsType } from "react-native-gifted-charts";


export const typesOfExpense: ExpensesTypes[]= [
{title: "Produkty spozywcze", icon: require("@/assets/images/shopping-cart.png") , color: "#3a86ff" },
{title: "Paliwo", icon: require("@/assets/images/shopping-cart.png") , color: "#8338ec" },
{title: "Wynajem", icon: require("@/assets/images/shopping-cart.png") , color: "#ff006e" },
{title: "Restauracja", icon: require("@/assets/images/shopping-cart.png") , color: "#fb5607" },
{title: "Siłownia", icon: require("@/assets/images/shopping-cart.png") , color: "#ffbe0b" },
{title: "Wakacje", icon: require("@/assets/images/shopping-cart.png") , color: "#22577a" },
{title: "Prezent", icon: require("@/assets/images/shopping-cart.png") , color: "#38a3a5" },
{title: "Rozrywka", icon: require("@/assets/images/shopping-cart.png") , color: "#57cc99" },
{title: "Kredyt", icon: require("@/assets/images/shopping-cart.png") , color: "#80ed99" },
{title: "Czynsz i media", icon: require("@/assets/images/shopping-cart.png") , color: "#c7f9cc" },
{title: "Inne", icon: require("@/assets/images/shopping-cart.png") , color: "#b5e2fa" },
];

export const typesOfIncome: ExpensesTypes[] = [
    {title: "Pensja", color: "#f95738", icon: require("@/assets/images/shopping-cart.png") },
    {title: "Prezent", color: "##ee964b", icon: require("@/assets/images/shopping-cart.png")  },
    {title: "Sprzedaz", color: "#f4d35e", icon: require("@/assets/images/shopping-cart.png")  },
    {title: "Bonus", color: "#faf0ca", icon: require("@/assets/images/shopping-cart.png")  },
    {title: "Premia", color: "#0d3b66", icon: require("@/assets/images/shopping-cart.png")  },
    {title: "Inne", color: "#81b29a", icon: require("@/assets/images/shopping-cart.png")  },
]


export const pieDataExpenses: PieChartTypes[] = [
    {
        value: 47,
        color: "#009FFF",
        gradientCenterColor: "#006DFF",
        focused: false,
        name: 'Fuel'
    },
    {
        value: 40,
        color: "#93FCF8",
        gradientCenterColor: "#3BE9DE",
        focused: false,
        name: 'Fuel'
    },
    {
        value: 16,
        color: "#BDB2FA",
        gradientCenterColor: "#8F80F3",
        focused: true,
        name: 'Fuel'
    },
    {
        value: 30,
        color: "#FFA5BA",
        gradientCenterColor: "#FF7F97",
        focused: false,
        name: 'Fuel'
    },
];
    
