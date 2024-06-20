import {
	Button,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import colorConventer from "@/utils/colorConventer";
import { useNavigation } from "expo-router";
import {
	NativeStackNavigationProp,
	NativeStackScreenProps,
} from "react-native-screens/lib/typescript/native-stack/types";

export interface HomeScreenProps {
	navigation: NativeStackScreenProps<any, any>;
	category: any;
}

const Categories = ({ category }: any) => {
	const [icon, setIcon] = useState();
	const [color, setColor] = useState<string>("");


	useEffect(() => {
		category.data.map((item: any) => setIcon(item.icon));
		category.data.map((item: any) => setColor(item.color));
	}, [category]);

	const rgba = colorConventer(color, 0.15);
	console.log("category: ", category);
	const navigation = useNavigation();

	const sum = category.data.reduce((acc: number, item: any) => {
		return acc + parseFloat(item.value);
	}, 0);

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("IncomeExpenseDetail")}
			style={[styles.contener, { borderColor: color, backgroundColor: rgba }]}
		>
			<View><Image source={icon} /></View>
			<View>
				<Text style={{ fontSize: 20 }}>{category.name}</Text>
				<Text>Tranzakcje: {category.data.length}</Text>
			</View>
			<View>
				<Text style={{ fontSize: 22, color: "#dc2f02" }}>{sum} zł</Text>
			</View>
		</TouchableOpacity>
	);
};

export default Categories;

const styles = StyleSheet.create({
	contener: {
		height: 70,
		marginVertical: 5,
		borderRadius: 10,
		borderWidth: 0.6,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 25,
	},
});
