import BudgetContener from "@/components/BudgetContener";
import Chart from "@/components/Chart";
import SelectData from "@/components/SelectData";
import { getAllData, getFilteredDataByMonth } from "@/store/manageData";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { filterByMonth } from "@/utils/filterData";
import { getMonths } from "@/utils/handleGetDate";
import getData from "@/utils/storageData";
import { format } from "date-fns";
import { useEffect, useState } from "react";

import { StyleSheet, SafeAreaView } from "react-native";

export default function HomeScreen() {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const costInformation = useAppSelector(state => state.manageData.isSelected);
	const allData = useAppSelector(state => state.manageData.allData);
	const dispatch = useAppDispatch();

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
			const dataFromStorage = await getData(costInformation);
			dispatch(getAllData(dataFromStorage));

			if (dataFromStorage!== null || undefined) {
				filteredDataByMonth = filterByMonth(dataFromStorage, selectedDate);
			}
			dispatch(getFilteredDataByMonth(filteredDataByMonth));
		};

		showData();
	}, [costInformation, selectedDate]);

	// console.log("d: ", filteredDataByMonth);
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
			<BudgetContener />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
	},
});
