import {
	Button,
	Image,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import colorConventer from "@/utils/colorConventer";
import { Link, Redirect, useNavigation, useRouter } from "expo-router";
import {
	NativeStackNavigationProp,
	NativeStackScreenProps,
} from "react-native-screens/lib/typescript/native-stack/types";
import { greenValuColor, incomeColor, redValueColor } from "@/constants/Colors";
import { useAppSelector } from "@/store/store";

export interface HomeScreenProps {
	navigation: NativeStackScreenProps<any, any>;
	category: any;
}

const Categories = ({ category }: any) => {
	const [icon, setIcon] = useState();
	const [color, setColor] = useState<string>("");
	const incomeExpense = useAppSelector(state => state.manageData.isSelected);

	const fil = useAppSelector(state => state.manageData.filteredData);
	const router = useRouter();

	useEffect(() => {
		category.data.map((item: any) => setIcon(item.icon));
		category.data.map((item: any) => setColor(item.color));
	}, [category]);

	const rgba = colorConventer(color, 0.15);
	console.log("category: ", fil);

	const sum = category.data.reduce((acc: number, item: any) => {
		return acc + parseFloat(item.value);
	}, 0);

	//tutaj przesylam dalej tylko name ( category.name )

	return (
		<TouchableOpacity
			onPress={() =>
				router.push({
					pathname: "../detail",
					params: { category: category.name },
				})
			}
			style={[styles.contener, { borderColor: color, backgroundColor: rgba }]}
		>
			<View>
				<Image source={icon} />
			</View>
			<View>
				<Text style={{ fontSize: 20 }}>{category.name}</Text>
				<Text>Tranzakcje: {category.data.length}</Text>
			</View>
			<View>
				{incomeExpense == "expenses" ? (
					<Text style={{ fontSize: 22, color: redValueColor }}>- {sum} zł</Text>
				) : (
					<Text style={{ fontSize: 22, color: incomeColor }}>{sum} zł</Text>
				)}
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
