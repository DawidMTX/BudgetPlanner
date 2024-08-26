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
import { normalize } from "@/utils/normalizeFont";
import { borderRadius } from "@/constants/data";


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
		padding: 8,
		borderRadius: borderRadius,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: 'center'
	},
	textStyle: {
		alignItems: "center",
		fontSize: normalize(17),
		fontFamily: "Mrt"
	},
	iconStyle: {
		fontSize: normalize(20),
		marginHorizontal: 5,
	},
});
