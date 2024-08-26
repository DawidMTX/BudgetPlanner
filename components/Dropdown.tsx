import { ScrollView, Image, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { DropdownProps } from "@/types";
import {
	borderRadius,
	borderWidth,
	elementHeight,
	elementWidth,
} from "@/constants/data";
import { normalize } from "@/utils/normalizeFont";
// import { Image } from "expo-image";

const dropdownRef = useRef<SelectDropdown>(null);

const Dropdown = ({
	entryData,
	onSelect,
	title,
	showChevronIcon,
	reset,
}: DropdownProps) => {
	if (reset) {
		dropdownRef.current?.reset();
	}
	return (
		<SelectDropdown
			ref={dropdownRef}
			data={entryData}
			onSelect={onSelect}
			renderButton={(selectedItem, isOpened) => {
				return (
					<View style={styles.dropdownButtonStyle}>
						{selectedItem && (
							<Image
								source={selectedItem.icon}
								style={styles.dropdownItemIconStyle}
							/>
						)}
						<Text style={styles.dropdownButtonTxtStyle}>
							{(selectedItem && selectedItem.title) || `${title}`}
						</Text>

						{showChevronIcon && (
							<TabBarIcon
								name={isOpened ? "chevron-up" : "chevron-down"}
								style={styles.dropdownButtonArrowStyle}
							/>
						)}
					</View>
				);
			}}
			renderItem={(item, index, isSelected) => {
				return (
					<View
						style={{
							...styles.dropdownItemStyle,
							...(isSelected && { backgroundColor: "#D2D9DF" }),
						}}
					>
						<Image source={item.icon} />
						<Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
					</View>
				);
			}}
			showsVerticalScrollIndicator={true}
			dropdownStyle={styles.dropdownMenuStyle}
		/>
	);
};

export default Dropdown;

const styles = StyleSheet.create({
	dropdownButtonStyle: {
		width: elementWidth,
		height: elementHeight,
		borderWidth: borderWidth,
		borderRadius: borderRadius,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 12,
		margin: 12,
	},
	dropdownButtonTxtStyle: {
		flex: 1,
		fontSize: 18,
		fontWeight: "500",
		color: "#151E26",
		fontFamily: "Mrt",
	},
	dropdownButtonArrowStyle: {
		fontSize: 28,
	},
	dropdownButtonIconStyle: {
		fontSize: 28,
		marginRight: 8,
	},
	dropdownMenuStyle: {
		backgroundColor: "#E9ECEF",
		borderRadius: 8,
		height: 300,
	},
	dropdownItemStyle: {
		width: "100%",
		height: 50,
		flexDirection: "row",
		paddingHorizontal: 12,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 8,
		gap: 12,
	},
	dropdownItemTxtStyle: {
		flex: 1,
		fontSize: normalize(18),
		fontWeight: "500",
		color: "#151E26",
		fontFamily: "Mrt",
	},
	dropdownItemIconStyle: {
		marginRight: 12,
	},
	image: {},
});
