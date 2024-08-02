import BudgetContener from "@/components/BudgetContener";
import Chart from "@/components/Chart";
import SelectData from "@/components/SelectData";
import {
	getFilteredDataByMonth,
	getSumariseValue,
} from "@/store/manageData";
import { useAppDispatch, useAppSelector } from "@/store/store";
import filterByMonth from "@/utils/filterByMonth";
import { getMonths } from "@/utils/handleGetDate";
import getData from "@/utils/storageData";
import sumariseValues from "@/utils/sumariseValue";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";

export default function HomeScreen() {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const costInformation = useAppSelector(state => state.manageData.isSelected);
	const dispatch = useAppDispatch();
	const isFocus = useIsFocused();

	const addDay = () => {
		const date: any = getMonths("add", selectedDate);
		setSelectedDate(date);
	};
	const subDay = () => {
		const date: any = getMonths("sub", selectedDate);
		setSelectedDate(date);
	};

	useEffect(() => {
		let filteredDataByMonth: any = [];
		const showData = async () => {
			const incomesData = await getData("incomes");
			const expensesData = await getData("expenses");
			// dispatch(getAllExpensesData("expenses"));
			// dispatch(getAllIncomesData("incomes"));

			switch (costInformation) {
				case "expenses":
					filteredDataByMonth = filterByMonth(expensesData, selectedDate);
					break;
				case "incomes":
					filteredDataByMonth = filterByMonth(incomesData, selectedDate);
					break;
			}
			
			dispatch(getFilteredDataByMonth(filteredDataByMonth));

			const {incomes, expense} = await sumariseValues(
				incomesData,
				expensesData,
				selectedDate
			);
			
			dispatch(getSumariseValue({incomes, expense}));
		};

		showData();
	}, [costInformation, selectedDate, isFocus]);

	return (
		<SafeAreaView style={styles.container}>
			<SelectData
				style={{
					gap: 10,
					marginVertical: 5,
					marginHorizontal: 7,
					backgroundColor: "white",
					shadowColor: "#171717",
					shadowOffset: { width: -1, height: 2 },
					shadowOpacity: 0.2,
					shadowRadius: 3,
				}}
				dateFormat="LLLL yyyy"
				defaultValue={selectedDate}
				handleAddDay={addDay}
				handleSubDay={subDay}
			/>
			<Chart />
			<BudgetContener selectedDate={selectedDate}/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
	},
});
