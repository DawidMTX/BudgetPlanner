import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useRef } from "react";
import { AntIcon } from "./navigation/TabBarIcon";
import { SelectDateProps } from "@/types";
import { format } from "date-fns";
import { pl, se } from "date-fns/locale";
import GestureRecognizer from "react-native-swipe-gestures";


const SelectData = ({
	defaultValue,
	handleAddDay,
	handleSubDay,
	dateFormat,
	style,
}: SelectDateProps) => {
	
	return (
		<GestureRecognizer
		onSwipeLeft={handleAddDay}
        onSwipeRight={handleSubDay}>
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
		</GestureRecognizer>
			
	
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
