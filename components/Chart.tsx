import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PieChart from "react-native-pie-chart";
import {
	expenseColor,
	fees,
	food,
	gas,
	incomeColor,
	pleasures,
} from "@/constants/Colors";

const Chart = () => {
	const widthAndHeight = 190;
	const [series, setSeries] = useState<Array<number>>([1, 0, 0, 0]);
	const [sliceColor, setSliceColor] = useState<Array<string>>([
		gas,
		fees,
		food,
		pleasures,
	]);
	// const sliceColor = ["#fbd203", "#ffb300", "#ff9100", "#ff6c00"];
	const data = [
		{ name: "gas", series: 1, sliceColor: "#FFF67E" },
		{ name: "fees", series: 1, sliceColor: "#DBA979" },
		{ name: "food", series: 1, sliceColor: "#9BCF53" },
		{ name: "pleasures", series: 1, sliceColor: "#DD5746" },
	];

	useEffect(() => {
		let arr: Array<number> = [];
		data.map(item => {
			arr.push(item.series);
			return arr;
		});
		setSeries(arr);
	}, []);

	return (
		<View style={styles.chartContener}>
			<View style={styles.bilans}>
				<View style={[styles.incomeExpenses, { backgroundColor: incomeColor }]}>
					<Text style={styles.bilansTextColor}>3000 zł</Text>
				</View>
				<View
					style={[styles.incomeExpenses, { backgroundColor: expenseColor }]}
				>
					<Text style={styles.bilansTextColor}>-2000 zł</Text>
				</View>
			</View>
			<View style={styles.chart}>
				<PieChart
					widthAndHeight={widthAndHeight}
					series={series}
					sliceColor={sliceColor}
					coverRadius={0.45}
					coverFill={"#FFF"}
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
			<View>
				<Text>Legenda: </Text>
				<View style={styles.circleContener}>
					<View style={styles.circle}>
						<View style={[styles.colorCircle, { backgroundColor: gas }]}></View>
						<Text>Paliwo</Text>
					</View>
					<View style={styles.circle}>
						<View
							style={[styles.colorCircle, { backgroundColor: fees }]}
						></View>
						<Text>Opaty</Text>
					</View>
					<View style={styles.circle}>
						<View
							style={[styles.colorCircle, { backgroundColor: pleasures }]}
						></View>
						<Text>Art. spozywcze</Text>
					</View>
					<View style={styles.circle}>
						<View
							style={[styles.colorCircle, { backgroundColor: food }]}
						></View>
						<Text>Przyjemości</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default Chart;

const styles = StyleSheet.create({
	chartContener: {
		gap: 30,
		marginVertical: 15,
		paddingHorizontal: 25,
	},
	bilans: {
		flexDirection: "row",
		justifyContent: "space-between",
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
	circleContener: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	circle: {
		flexDirection: "row",
		gap: 20,
		width: "50%",
		marginVertical: 5,
	},
	colorCircle: {
		width: 18,
		height: 18,
		borderRadius: 100,
	},
});
