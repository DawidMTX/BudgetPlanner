import {
	Button,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ca } from "date-fns/locale";
import { set } from "date-fns";

const Categories = ({ category }: any) => {
	const [icon, setIcon] = useState();
	const [color, setColor] = useState<string>('')
	console.log("category: ", color);

	useEffect(() => {
		category.data.map((item: any) => console.log(item.icon));
		category.data.map((item: any) => setColor(item.color))

	}, []);

	const sum = category.data.reduce((acc: number, item: any) => {
		return acc + parseFloat(item.value);
	}, 0);

	return (
		<View style={[styles.contener, {borderColor: color, backgroundColor: color}]}>
			<View>{/* <Image source={category.data.icon} /> */}</View>
			<View>
				<Text style={{ fontSize: 20 }}>{category.name}</Text>
				<Text>Tranzakcje: {category.data.length}</Text>
			</View>
			<View>
				<Text style={{ fontSize: 22, color: '#dc2f02' }}>{sum} zł</Text>
			</View>
		</View>
	);
};

export default Categories;

const styles = StyleSheet.create({
	contener: {
		height: 70,
		marginVertical: 5,
		borderRadius: 10,
		borderColor: "red",
		borderWidth: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 25,
	},
});
