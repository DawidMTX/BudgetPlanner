import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { InputProps } from "@/types";
import { normalize } from "@/utils/normalizeFont";
import { borderRadius, borderWidth, elementHeight, elementWidth } from "@/constants/data";

const Input = ({
	name,
	style,
	onChangeText,
	value,
	placeholder,
	keyboardType,
	maxLength,
}: InputProps) => {
	return (
		<View>
			<Text style={styles.label}>{name} </Text>
			<TextInput
				style={[styles.input, style]}
				onChangeText={onChangeText}
				value={value}
				placeholder={placeholder}
				keyboardType={keyboardType}
				maxLength={maxLength}
			/>
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
	input: {
		width: elementWidth,
		height: elementHeight,
		margin: 12,
		borderWidth: borderWidth,
		padding: 10,
		borderRadius: borderRadius,
		fontSize: normalize(16),
		fontFamily: 'Mrt'
	},
	label:{
		fontFamily: 'Mrt',
		fontSize: normalize(15)
	}
});
