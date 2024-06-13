import {
	Button,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getData } from "@/utils/storageData";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BudgetDetail = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const showData = async () => {
			const dataFromStorage = await getData("expenses");
			setData(dataFromStorage);
		};
		showData()
	}, []);

	console.log("d: ", data);

	return (
		<ScrollView style={[styles.contener, styles.shadowProp]}>
			<TouchableOpacity >
				<Text> pokaz dane</Text>
			</TouchableOpacity>
			<View>
				{/* {data ? (data.map((item, i)=> (
					<Text>{item.name}</Text>
					<Text>{item.id}</Text>
				))) : (<Text> Jescze nic tu nie ma </Text>)} */}
			</View>
		</ScrollView>
	);
};

export default BudgetDetail;

const styles = StyleSheet.create({
	contener: {
		gap: 30,
		marginVertical: 5,
		marginHorizontal: 7,
		padding: 25,
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
});
