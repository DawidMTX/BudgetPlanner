import BudgetDetail from "@/components/BudgetDetail";
import Chart from "@/components/Chart";
import SelectData from "@/components/SelectData";
import { useAppSelector } from "@/store/store";
import { getMonths } from "@/utils/handleGetDate";
import getData from "@/utils/storageData";
import { format } from "date-fns";
import { useEffect, useState } from "react";

import { StyleSheet, SafeAreaView } from "react-native";

export default function HomeScreen() {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [data, setData] = useState([]);
	let filteredDataByMonth: any[] = [];
	let listOfCategory: any[] = [];
	const costInformation = useAppSelector(state => state.manageData.isSelected);

	const addDay = () => {
		const date: any = getMonths("add", selectedDate);
		setSelectedDate(date);
	};
	const subDay = () => {
		const date: any = getMonths("sub", selectedDate);
		setSelectedDate(date);
	};

	useEffect(() => {
		const showData = async () => {
			const dataFromStorage = await getData(costInformation);
			setData(dataFromStorage);
		};
		showData();
	}, [costInformation, selectedDate]);


	// Filter by month date
	if (data !== null || undefined) {
		filteredDataByMonth = data.filter((item): any => {
			return format(item["date"], "MM-yyyy") == format(selectedDate, "MM-yyyy");
		});

		// console.log("get month data: ", filteredDataByMonth);
	} else console.log("There is no message to display");

	//Filter by category 
	if (filteredDataByMonth) {
		filteredDataByMonth.map((item, i) => {
			if (listOfCategory.includes(item["title"])) {
				return;
			} else {
				listOfCategory.push(item["title"]);
			}
		});
	}

	
	console.log("d: ", listOfCategory);

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
			<BudgetDetail />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
	},
});
