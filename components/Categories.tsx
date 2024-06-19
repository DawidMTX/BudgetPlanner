import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ca } from "date-fns/locale";
import { set } from "date-fns";

const Categories = ({ category }: any) => {
	
	console.log("category: ", category.data);

	//ikona




	const sum = category.data.reduce((acc: number, item: any) => {
		 return acc + parseFloat(item.value);

	},0);



	console.log("Sume: ", category.data.icon)

	return (
		<View style={styles.contener}>
			<View><Image source={category.data.icon} /></View>
			<View>
				<Text>{category.name}</Text>
				<Text>{category.data.length}</Text>
			</View>
			<View><Text>{sum}</Text></View>
		</View>
	);
};

export default Categories;

const styles = StyleSheet.create({
	contener: {
		height: 40,
		borderRadius: 10,
		borderColor: "red",
		flexDirection: 'row'
	},
});
