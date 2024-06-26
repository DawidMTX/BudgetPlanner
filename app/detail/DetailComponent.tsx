import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { format } from "date-fns";

const DetailComponent = ({ singleCategoryData }: any) => {
	return (
		<View style={styles.contener}>
			<View>
				<Text style={styles.nameText}>{singleCategoryData.name}</Text>
				<Text style={styles.dateText}>
					{format(singleCategoryData.date, "dd.mm.yyyy")}
				</Text>
			</View>
			<View>
				<Text style={[styles.valueText, {}]}> - {singleCategoryData.value} zł</Text>
			</View>
		</View>
	);
};

export default DetailComponent;

const styles = StyleSheet.create({
	contener: {
		borderWidth: 0.2,
        borderColor: '#ccc',
		height: 80,
		marginVertical: 5,
     backgroundColor: '#fff',
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 20,
		alignItems: "center",
	},
	valueText: {
		fontSize: 30,
	},
	nameText: {
		fontSize: 28,
	},
	dateText: {
		fontSize: 17,
	},
});
