import { filterByMonth } from "./filterData";

const sumariseValues = async (
	incomesData: any,
	expensesData: any,
	selectedDate: any
) => {
	const filteredIncomes = await filterByMonth(incomesData, selectedDate);
	const filteredExpenses = await filterByMonth(expensesData, selectedDate);

	let expense = filteredExpenses.reduce((acc: any, obj: any) => {
		return acc + parseFloat(obj.value);
	}, 0);

	let incomes = filteredIncomes.reduce((acc: any, obj: any) => {
		return acc + parseFloat(obj.value);
	}, 0);
	return {incomes, expense};
};

export const calculatingProcentage = (value: number, sum: number) => {
	const percent = (value / sum) * 100;
	return percent.toFixed(1)
}

export default sumariseValues;
