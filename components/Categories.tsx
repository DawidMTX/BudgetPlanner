import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Categories = ({ category }: any) => {
	console.log(category);



	return (
		<View>
			<Text>{category.data.length}</Text>
		
		</View>
	);
};

export default Categories;

const styles = StyleSheet.create({});
