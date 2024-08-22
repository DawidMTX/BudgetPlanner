import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ActiveButtonProps } from "@/types";
import { normalize } from "@/utils/normalizeFont";



    const ActiveButton = ({ title, onPress, active, isSelected, style, activeStyle}: ActiveButtonProps) => (
		<TouchableOpacity
			style={[styles.button, isSelected === active ? [styles.buttonIsSelected, activeStyle] : null, style]}
			onPress={onPress}
		>
			<Text style={{fontFamily: 'MrtMed', fontSize: normalize(14)}}>{title}</Text>
		</TouchableOpacity>
	);




export default ActiveButton;

const styles = StyleSheet.create({
    
	button: {
		alignItems: "center",
		justifyContent: "center",
		width: "50%",
		height: '99%',
		borderRadius: 5,
		
	},
	buttonIsSelected: {
		backgroundColor: "#fff",
		padding: 5,
		borderWidth: 1,
		borderColor: "#dfdedb",
		overflow: 'hidden'
	},
});
