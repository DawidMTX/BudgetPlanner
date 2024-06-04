import {
	Button,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { PieChart } from "react-native-gifted-charts";
import {
	expenseColor,
	fees,
	food,
	gas,
	incomeColor,
	pleasures,
} from "@/constants/Colors";

import ActiveButton from "./ActiveButton";

const Chart = () => {
	const [isSelected, setIsSelected] = useState<string>("expenses");

	const [series, setSeries] = useState<Array<number>>([1, 0, 0, 0]);
	const [sliceColor, setSliceColor] = useState<Array<string>>([
		gas,
		fees,
		food,
		pleasures,
	]);



	const pieData = [
		{
			value: 47,
			color: "#009FFF",
			gradientCenterColor: "#006DFF",
			focused: false,
		},
		{
			value: 40,
			color: "#93FCF8",
			gradientCenterColor: "#3BE9DE",
			focused: false,
		},
		{
			value: 16,
			color: "#BDB2FA",
			gradientCenterColor: "#8F80F3",
			focused: true,
		},
		{
			value: 3,
			color: "#FFA5BA",
			gradientCenterColor: "#FF7F97",
			focused: false,
		},
	];
	// useEffect(() => {
	// 	let arr: Array<number> = [];
	// 	data.map(item => {
	// 		arr.push(item.series);
	// 		return arr;
	// 	});
	// 	setSeries(arr);
	// }, []);

	const showIncome = () => {
		setIsSelected("incomes");
	};

	const showExpenses = () => {
		setIsSelected("expenses");
	};

	return (
		<View style={[styles.chartContener, styles.shadowProp]}>
			<View style={styles.buttonsContener}>
				<ActiveButton
					title="Dochody"
					active={'incomes'}
					onPress={showIncome}
					isSelected={isSelected}
					
				/>
				<ActiveButton
					title="Wydatki"
					active={'expenses'}
					onPress={showExpenses}
					isSelected={isSelected}
				/>
			</View>
			<View style={styles.chart}>
				<PieChart
					data={pieData}
					donut
					showGradient
					sectionAutoFocus
					radius={90}
					innerRadius={60}
					innerCircleColor={"#232B5D"}
					centerLabelComponent={() => {
						return (
							<View style={{ justifyContent: "center", alignItems: "center" }}>
								<Text
									style={{ fontSize: 22, color: "white", fontWeight: "bold" }}
								>
									47%
								</Text>
								<Text style={{ fontSize: 14, color: "white" }}>Excellent</Text>
							</View>
						);
					}}
				/>
			</View>
			<View
				style={[
					styles.incomeExpenses,
					{ backgroundColor: incomeColor, alignItems: "center" },
				]}
			>
				<Text style={styles.bilansTextColor}>Bilans: 2220</Text>
			</View>
		</View>
	);
};

export default Chart;

const styles = StyleSheet.create({
	chartContener: {
		gap: 30,
		margin: 7,
		padding: 25,
		borderRadius: 10,
		backgroundColor: "white",
	},
	buttonsContener: {
		width: "100%",
		height: 35,
		flexDirection: "row",
		backgroundColor: "#F1F1F1",
		borderRadius: 5,
	
	},

	bilansTextColor: { color: "white" },

	incomeExpenses: {
		color: "white",
		padding: 7,
		borderRadius: 4,
	},
	chart: {
		alignItems: "center",
	},

	shadowProp: {
		shadowColor: "#171717",
		shadowOffset: { width: -2, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
});
