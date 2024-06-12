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
	dateFormat,
	style,
}: SelectDateProps) => {
	return (
		<View style={[styles.contener, style]}>
			<TouchableOpacity onPress={handleSubDay}>
				<AntIcon
					style={styles.iconStyle}
					name="left"
				/>
			</TouchableOpacity>
			<Text style={styles.textStyle}>
				{format(defaultValue, dateFormat, { locale: pl })}
			</Text>
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
		padding: 10,
		borderRadius: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		
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
