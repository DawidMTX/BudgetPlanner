import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { normalize } from "@/utils/normalizeFont";

const CostsView = ({bacgroundColor, bilans, name, textColor, style}: any) => {
	return (
		<View
			style={[
				styles.incomeExpenses,
				{
					backgroundColor: bacgroundColor,
					alignItems: "center",
				},
                style
			]}
		>
			<Text style={[styles.bilansText,{color: textColor}]}>{name}: {bilans.toFixed(2).toString()}</Text>
		</View>
	);
};

export default CostsView;

const styles = StyleSheet.create({
    bilansText: {fontSize: normalize(16), fontFamily: 'MrtMed'},

	incomeExpenses: {
		padding: 7,
		borderRadius: 4,

	},
});
