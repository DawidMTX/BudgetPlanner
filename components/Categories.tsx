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



const Categories = ({ category }: any) => {
	const [icon, setIcon] = useState();
	const [color, setColor] = useState<string>('')
	const [rgbaColor, setRgbaColor] = useState('')
	const rgba = colorConventer(color, 0.15)
	console.log("category: ", rgba);

	useEffect(() => {
		category.data.map((item: any) => console.log(item.icon));
		category.data.map((item: any) => setColor(item.color))
	
	}, []);
	
	

	const sum = category.data.reduce((acc: number, item: any) => {
		return acc + parseFloat(item.value);
	}, 0);

	return (
		<View style={[styles.contener, {borderColor: color, backgroundColor: rgba}]}>
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
		borderWidth: 0.6,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 25,
	},
});
