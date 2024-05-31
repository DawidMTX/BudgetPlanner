import {
	Image,
	StyleSheet,
	Platform,
	View,
	SafeAreaView,
	Text,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import PieChart from "react-native-pie-chart";
import { useEffect, useState } from "react";

export default function HomeScreen() {
	const widthAndHeight = 220;
	const [series, setSeries] = useState<Array<number>>([1, 0, 0, 0]);
	const [sliceColor, setSliceColor] = useState<Array<string>>([
		"#FFF67E",
		"#DBA979",
		"#9BCF53",
		"#DD5746",
	]);
	// const sliceColor = ["#fbd203", "#ffb300", "#ff9100", "#ff6c00"];
	const data = [
		{ name: "gas", series: 1, sliceColor: "#FFF67E" },
		{ name: "kredits", series: 1, sliceColor: "#DBA979" },
		{ name: "food", series: 1, sliceColor: "#9BCF53" },
		{ name: "pleasure", series: 1, sliceColor: "#DD5746" },
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
		<SafeAreaView style={styles.container}>
			<View style={styles.chartContener}>
				<View style={styles.bilans}>
					<Text style={[styles.incomeExpenses, { backgroundColor: "green" }]}>
						3000 zł
					</Text>
					<Text style={[styles.incomeExpenses, { backgroundColor: "red" }]}>
						{" "}
						-2000 zł
					</Text>
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
				<View>
					<Text>Legenda: </Text>
				</View>
			</View>
			<View></View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
	},
	chartContener: {
		gap: 30,

		paddingHorizontal: 25,
	},
	bilans: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	incomeExpenses: {
		color: "white",
		padding: 7,
		borderRadius: 10,
	},
	chart: {
		alignItems: "center",
	},
});
