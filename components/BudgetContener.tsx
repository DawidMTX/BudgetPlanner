import {
	Button,
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppSelector } from "@/store/store";
import filterData from "@/utils/filterData";

const BudgetContener = () => {
	const [data, setData] = useState<any>(null);
	const filteredDataByMonth = useAppSelector(
		state => state.manageData.filteredData
	);

	useEffect(() => {
		const filteredData = filterData(filteredDataByMonth);
		setData(filteredData);
	}, [filteredDataByMonth]);

	// - problem z useEffect z filteredDataByMonth

	// console.log("BudgetContener: ", filteredDataByMonth)

	const removeValue = async () => {
		try {
			await AsyncStorage.removeItem("expenses");
		} catch (e) {
			// remove error
		}

		console.log("Done.");
	};

	// console.log(data)
	//pobieram zfiltrowane dane dane z sotrage
	return (
		<View style={[styles.contener, styles.shadowProp]}>
			<ScrollView>
				<View style={{ marginHorizontal: 25, marginVertical: 20 }}>
					{!data ? (
						<View style={styles.noDataStyles}>
							<Text>Ups! Nic tutaj nie ma!</Text>
						</View>
					) : (
						<View>
							{data.map((item: any) => (
								<Categories category={item} />
							))}
						</View>
					)}

					<TouchableOpacity onPress={removeValue}>
						<Text>Usuń</Text>
					</TouchableOpacity>
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
});
