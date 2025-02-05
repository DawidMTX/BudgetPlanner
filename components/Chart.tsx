import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { PieChart } from "react-native-gifted-charts";
import { expenseColor, incomeColor } from "@/constants/Colors";
import ActiveButton from "./ActiveButton";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getCostInformation } from "@/store/manageData";
import CostsView from "./CostsView";
import calculatingProcentage from "@/utils/calculatingProcentage";
import chartFilterData from "@/utils/chartFilterData";
import { normalize } from "@/utils/normalizeFont";
import { useTranslation } from "react-i18next";

const Chart = () => {
	const [isSelected, setIsSelected] = useState<string>("expenses");
	const [nameOfCategory, setNameOfCategory] = useState<string>("");
	const [percent, setPercent] = useState<number | string>(0);
	const { height } = Dimensions.get("window");
	const { t } = useTranslation();
	const [data, setData] = useState([
		{
			value: 1,
			color: "#009FFF",
			focused: false,
			name: " ",
		},
	]);
	const dispatch = useAppDispatch();
	const filteredDataByMonth = useAppSelector(
		state => state.manageData.filteredData
	);
	const bilans = useAppSelector(state => state.manageData.bilans);
	const bilansBacgroundColor = bilans > 0 ? incomeColor : expenseColor;

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
			setNameOfCategory("");
			setPercent(0);
		} else {
			setNameOfCategory(chartFilter[0].name);
			setPercent(calculatingProcentage(chartFilter[0].value, sum));
			chartFilter[0].focused = true;
			setData(chartFilter);
		}
	}, [filteredDataByMonth]);


	
	return (
		<View style={[styles.chartContener, styles.shadowProp]}>
			<View style={styles.buttonsContener}>
				<ActiveButton
					title={t("screens.home.chart.text.incomes")}
					active={"incomes"}
					onPress={() => setIsSelected("incomes")}
					isSelected={isSelected}
					style={{ width: "50%", height: "99%", borderRadius: 5 }}
				/>
				<ActiveButton
					title={t("screens.home.chart.text.expenses")}
					active={"expenses"}
					onPress={() => setIsSelected("expenses")}
					style={{ width: "50%", height: "99%", borderRadius: 5 }}
					isSelected={isSelected}
				/>
			</View>
			<View style={styles.chart}>
				<PieChart
					data={data}
					donut
					showGradient
					focusOnPress
					radius={height / 10}
					innerRadius={height / 15}
					onPress={(item: any) => {
						setNameOfCategory(item.name);
						setPercent(calculatingProcentage(item.value, sum));
					}}
					innerCircleColor={"#232B5D"}
					centerLabelComponent={() => {
						return (
							<View style={{ justifyContent: "center", alignItems: "center" }}>
								<Text
									style={{
										fontSize: normalize(18),
										color: "white",
										fontFamily: "MrtBold",
									}}
								>
									{percent.toString()} %
								</Text>
								<Text
									style={{
										fontSize: normalize(11),
										color: "white",
										fontFamily: "MrtMed",
									}}
								>
									{nameOfCategory}
								</Text>
							</View>
						);
					}}
				/>
			</View>

			<CostsView
				bacgroundColor={bilansBacgroundColor}
				bilans={bilans}
				name={t("screens.home.chart.text.balance")}
				textColor="white"
			/>
		</View>
	);
};

export default Chart;

const styles = StyleSheet.create({
	chartContener: {
		gap: 30,
		margin: 7,
		padding: 18,
		borderRadius: 10,
		backgroundColor: "white",
		height: "45%",
		flexShrink: 1,
	},
	buttonsContener: {
		width: "100%",
		height: 35,
		flexDirection: "row",
		backgroundColor: "#F1F1F1",
		borderRadius: 5,
	},
	chart: {
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 1,
	},

	shadowProp: {
		shadowColor: "#171717",
		shadowOffset: { width: -2, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
});
