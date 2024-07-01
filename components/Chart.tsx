import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { PieChart } from "react-native-gifted-charts";
import { expenseColor, incomeColor } from "@/constants/Colors";
import ActiveButton from "./ActiveButton";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getCostInformation } from "@/store/manageData";
import { chartFilterData, filterByMonth } from "@/utils/filterData";

const Chart = () => {
	const [isSelected, setIsSelected] = useState<string>("expenses");
	const [nameOfCategory, setNameOfCategory] = useState<string>("");
	const [percent, setPercent] = useState<number | string>(0);
	const [data, setData] = useState([
		{
			value: 1,
			color: "#009FFF",
			focused: false,
			name: " ",
		},
	]);

	
	const filteredDataByMonth = useAppSelector(
		state => state.manageData.filteredData
	);
	const bilans = useAppSelector(state => state.manageData.bilans);
	const bilansBacgroundColor = bilans > 0 ? incomeColor : expenseColor;
	const dispatch = useAppDispatch();

	let sum = filteredDataByMonth.reduce((acc: any, obj: any) => {
		return acc + parseFloat(obj.value);
	}, 0);

	useEffect(() => {
		dispatch(getCostInformation(isSelected));
	}, [isSelected]);

	useEffect(() => {
		const chartFilter = chartFilterData(filteredDataByMonth);
		if (chartFilter.length == 0) {
			setData([
				{
					value: 1,
					color: "#009FFF",
					focused: false,
					name: "...",
				},
			]);
		} else {
			setData(chartFilter);
		}
		setNameOfCategory("");
		setPercent(0)
	}, [filteredDataByMonth]);

	// console.log("list: ", data);
	return (
		<View style={[styles.chartContener, styles.shadowProp]}>
			<View style={styles.buttonsContener}>
				<ActiveButton
					title="Dochody"
					active={"incomes"}
					onPress={() => setIsSelected("incomes")}
					isSelected={isSelected}
				/>
				<ActiveButton
					title="Wydatki"
					active={"expenses"}
					onPress={() => setIsSelected("expenses")}
					isSelected={isSelected}
				/>
			</View>
			<View style={styles.chart}>
				<PieChart
					data={data}
					donut
					showGradient
					focusOnPress
					radius={90}
					innerRadius={60}
					onPress={(item: any, index: any) => {
						setNameOfCategory(item.name);
						const per = (item.value) / sum * 100
						setPercent(per.toFixed(1));
					}}
					innerCircleColor={"#232B5D"}
					centerLabelComponent={() => {
						return (
							<View style={{ justifyContent: "center", alignItems: "center" }}>
								<Text
									style={{ fontSize: 22, color: "white", fontWeight: "bold" }}
								>
									{percent.toString()} %
								</Text>
								<Text style={{ fontSize: 14, color: "white" }}>
									{nameOfCategory}
								</Text>
							</View>
						);
					}}
				/>
			</View>
			<View
				style={[
					styles.incomeExpenses,
					{ backgroundColor: bilansBacgroundColor, alignItems: "center" },
				]}
			>
			
				<Text style={styles.bilansText}>Bilans: {bilans.toString()}</Text>
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

	bilansText: { color: "white", fontSize: 18 },

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
