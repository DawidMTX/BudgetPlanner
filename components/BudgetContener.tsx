import {
	Button,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppSelector } from "@/store/store";
import filterData from "@/utils/filterData";
import CostsView from "./CostsView";
import { expenseColor, incomeColor } from "@/constants/Colors";
import { Link } from "expo-router";

const BudgetContener = () => {
	const [data, setData] = useState<object[]>([]);
	const filteredDataByMonth = useAppSelector(
		state => state.manageData.filteredData
	);
	const selected = useAppSelector<string>(state => state.manageData.isSelected);
	const incomes = useAppSelector(state => state.manageData.incomes);
	const expenses = useAppSelector(state => state.manageData.expense);

	useEffect(() => {
		const filteredData = filterData(filteredDataByMonth);
		setData(filteredData);
	}, [filteredDataByMonth]);

	const textColor = selected == "incomes" ? incomeColor : expenseColor;
	const sum = selected == "incomes" ? incomes : expenses;

	// console.log("BudgetContener: ", data)

	const removeValue = async () => {
		try {
			await AsyncStorage.removeItem("expenses");
		} catch (e) {
			// remove error
		}

		console.log("Done.");
	};

	return (
		<View style={[styles.contener, styles.shadowProp]}>
			<ScrollView>
				<View style={{ marginHorizontal: 25, marginVertical: 20 }}>
					{data.length == 0 ? (
						<View style={styles.noDataStyles}>
							<Image
								source={require("@/assets/images/box.png")}
								style={styles.iamgeStyles}
							/>
							<Text style={{ fontSize: 18 }}>Ups! Nic tutaj nie ma!</Text>
							<Link
								href={{
									pathname: "/(tabs)/addNew",
									params: { selected: selected },
								}}
								asChild
							>
								<Button title="Dodaj nowy" />
							</Link>
						</View>
					) : (
						<View>
							{data.map((item: any) => (
								<Categories category={item} />
							))}
							<CostsView
								bacgroundColor={"none"}
								bilans={sum}
								name="Suma"
								textColor={textColor}
								style={{ alignItems: "left" }}
							/>
						</View>
					)}

					{/* <TouchableOpacity onPress={removeValue}>
						<Text>Usuń</Text>
					</TouchableOpacity> */}
				</View>
			</ScrollView>
		</View>
	);
};

export default BudgetContener;

const styles = StyleSheet.create({
	contener: {
		gap: 30,
		marginVertical: 5,
		marginHorizontal: 7,
		padding: 0,
		borderRadius: 10,
		backgroundColor: "white",
		flex: 1,
	},
	shadowProp: {
		shadowColor: "#171717",
		shadowOffset: { width: -1, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	noDataStyles: {
		height: 260,
		justifyContent: "center",
		alignItems: "center",
	},
	iamgeStyles: {
		width: 120,
		height: 120,
		opacity: 0.2,
	},
	linkStyle: { color: "#24A0ED", fontSize: 22, marginTop: 10 },
});
