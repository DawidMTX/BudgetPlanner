import BudgetDetail from "@/components/BudgetDetail";
import Chart from "@/components/Chart";
import SelectData from "@/components/SelectData";
import { getMonths } from "@/utils/handleGetDate";
import { useState } from "react";

import { StyleSheet, SafeAreaView } from "react-native";

export default function HomeScreen() {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const addDay = () => {
		const date: any = getMonths("add", selectedDate);
		setSelectedDate(date);
	};
	const subDay = () => {
		const date: any = getMonths("sub", selectedDate);
		setSelectedDate(date);
	};
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
