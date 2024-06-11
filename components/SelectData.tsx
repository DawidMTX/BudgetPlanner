import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import { AntIcon } from "./navigation/TabBarIcon";

const SelectData = () => {
	const handleAddMonth = () => {};

	return (
		<View style={styles.contener}>
			<TouchableOpacity onPress={() => handleAddMonth()}>
				<AntIcon
					style={styles.iconStyle}
					name="left"
				/>
			</TouchableOpacity>
			<Text style={styles.textStyle}>20 listopadssss 2024</Text>
			<TouchableOpacity onPress={handleAddMonth}>
				<AntIcon
					style={styles.iconStyle}
					name="right"
				/>
			</TouchableOpacity>
		</View>
	);
};

export default SelectData;

const styles = StyleSheet.create({
	contener: {
		width: 300,
		height: 45,
		margin: 12,
		borderWidth: 0.2,
		padding: 10,
		borderRadius: 10,
		flexDirection: "row",
		justifyContent: "space-between",
       overflow: 'hidden'
	},
	textStyle: {
		alignItems: "center",
		fontSize: 20,
	},
	iconStyle: {
		fontSize: 25,
		marginHorizontal: 5,
	},
});
