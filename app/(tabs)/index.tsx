import BudgetContener from "@/components/BudgetContener";
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
	const [data, setData] = useState<any>(null);
	let filteredDataByMonth: any = [];
	let listOfCategory: any = [];
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
			console.log("data: ",dataFromStorage)
			setData(dataFromStorage);
		};
		showData();
	}, [costInformation, selectedDate]);

	// Filter by month date
	if (data !== null || undefined) {
		filteredDataByMonth = data.filter((item: any) => {
			return format(item["date"], "MM-yyyy") == format(selectedDate, "MM-yyyy");
		});
	}

	//Filter by category
	if (filteredDataByMonth) {
		filteredDataByMonth.map((item: any, i: number) => {
			if (listOfCategory.includes(item["title"])) {
				return;
			} else {
				listOfCategory.push(item["title"]);
			}
		});
	}

	//Data filtered by category
	let collectionArray: any = [];
	if (listOfCategory) {
		for (let i = 0; i <= listOfCategory.length; i++) {
			let temporaryArray: any = [];
			filteredDataByMonth.map((item: any) => {
				if (item["title"].includes(listOfCategory[i])) {
					temporaryArray.push(item);
				}
			});
			collectionArray.push({
				name: `${listOfCategory[i]}`,
				data: temporaryArray
			});
		}
	}

	console.log("d: ", collectionArray);
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
			<BudgetContener data={collectionArray} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
	},
});
