import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AntIcon } from "./navigation/TabBarIcon";
import moment from "moment";
import "moment/locale/pl";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectedMonth } from "@/store/manageData";

const SelectMonth = () => {
	const dispathch = useAppDispatch();
	moment.locale("pl");
	const currentMonth = useAppSelector(store => store.manageData.month);

	const [month, setMonth] = useState<any>(currentMonth);
	// const [selectedMonth, setSelectedMonth] = useState<any>(moment())

	useEffect(() => {
		dispathch(selectedMonth(month));
	}, [month, currentMonth]);

	const handleAddMonth = () => {
		setMonth(month.add(1, "M"));

		// console.log("curent: ", currentMonth);
	};

	return (
		<View style={[styles.contener, styles.shadowProp]}>
			<TouchableOpacity  onPress={() => handleAddMonth()}>
				<AntIcon
					style={styles.iconStyle}
					name="left"
				/>
			</TouchableOpacity>
			<Text style={{ fontSize: 19 }}>month</Text>
			<TouchableOpacity onPress={handleAddMonth}>
				<AntIcon
					style={styles.iconStyle}
					name="right"
				/>
			</TouchableOpacity>
		</View>
	);
};

export default SelectMonth;

const styles = StyleSheet.create({
	contener: {
		gap: 10,
		marginVertical: 5,
		marginHorizontal: 7,
		padding: 10,
		borderRadius: 10,
		backgroundColor: "white",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	shadowProp: {
		shadowColor: "#171717",
		shadowOffset: { width: -1, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	iconStyle: {
		fontSize: 24,
		marginHorizontal: 18,

	},
});
