import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { format } from "date-fns";
import { incomeColor, redValueColor } from "@/constants/Colors";
import { useAppSelector } from "@/store/store";

const DetailComponent = ({ singleCategoryData }: any) => {
	const incomeExpense = useAppSelector(state => state.manageData.isSelected);
	return (
		<View style={styles.contener}>
			<View>
				<Text style={styles.nameText}>{singleCategoryData.name}</Text>
				<Text style={styles.dateText}>
					{format(singleCategoryData.date, "dd.MM.yyyy")}
				</Text>
			</View>
			<View>
				{incomeExpense == "expenses" ? (
					<Text style={{ fontSize: 22, color: redValueColor }}>
						{" "}
						- {singleCategoryData.value} zł
					</Text>
				) : (
					<Text style={{ fontSize: 22, color: incomeColor }}>
						{singleCategoryData.value} zł
					</Text>
				)}
			</View>
		</View>
	);
};

export default DetailComponent;

const styles = StyleSheet.create({
	contener: {
		borderWidth: 0.2,
		borderColor: "#ccc",
		height: 80,
		marginVertical: 1,
		backgroundColor: "#fff",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 20,
		alignItems: "center",
	},
	valueText: {
		fontSize: 30,
	},
	nameText: {
		fontSize: 28,
	},
	dateText: {
		fontSize: 17,
	},
});
