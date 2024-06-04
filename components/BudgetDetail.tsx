import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const BudgetDetail = () => {
	return (
		<ScrollView style={[styles.contener, styles.shadowProp]}>
			<Text>BudgetDetail</Text>
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
