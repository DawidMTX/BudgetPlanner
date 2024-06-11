import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import { AntIcon } from "./navigation/TabBarIcon";
import { SelectDateProps } from "@/types";
import getDays from "@/utils/handleGetDate";
import { format } from "date-fns";
import { pl, se } from "date-fns/locale";

const SelectData = ({
	defaultValue,
	handleAddDay,
	handleSubDay,
}: SelectDateProps) => {

	return (
		<View style={styles.contener}>
			<TouchableOpacity onPress={handleSubDay}>
				<AntIcon
					style={styles.iconStyle}
					name="left"
				/>
			</TouchableOpacity>
			<Text style={styles.textStyle}>{format(defaultValue, "dd MMMM yyyy", { locale: pl })}</Text>
			<TouchableOpacity onPress={handleAddDay}>
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
		overflow: "hidden",
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
