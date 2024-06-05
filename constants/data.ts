import { ExpensesTypes, PieChartTypes } from "@/types";
import { PieChartPropsType } from "react-native-gifted-charts";

export const typesOfExpense: ExpensesTypes[]= [
{title: "Produkty spozywcze", icon: "", color: "" },
{title: "Paliwo", icon: "", color: "" },
{title: "Wynajem", icon: "", color: "" },
{title: "Restauracja", icon: "", color: "" },
{title: "Siłownia", icon: "", color: "" },
{title: "Wakacje", icon: "", color: "" },
{title: "Prezent", icon: "", color: "" },
{title: "Rozrywka", icon: "", color: "" },
{title: "Kredyt", icon: "", color: "" },
{title: "Czynsz i media", icon: "", color: "" },
{title: "Inne", icon: "", color: "" },
];

export const typesOfIncome: ExpensesTypes[] = [
    {title: "Pensja", icon: "#009FFF", color: "" },
    {title: "Prezent", icon: "#93FCF8", color: "" },
    {title: "Sprzedaz", icon: "#BDB2FA", color: "" },
    {title: "Bonus", icon: "#FFA5BA", color: "" },
    {title: "Premia", icon: "#ABB159", color: "" },
    {title: "Inne", icon: "#776274", color: "" },
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
    
