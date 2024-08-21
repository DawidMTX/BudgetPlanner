import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { InputProps } from "@/types";

const Input = ({
	name,
	style,
	onChangeText,
	value,
	placeholder,
	keyboardType,
}: InputProps) => {
	return (
		<View>
			<Text style={{fontFamily: 'Mrt'}}>{name} </Text>
			<TextInput
				style={[styles.input, style]}
				onChangeText={onChangeText}
				value={value}
				placeholder={placeholder}
				keyboardType={keyboardType}
			/>
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
	input: {
		width: 300,
		height: 45,
		margin: 12,
		borderWidth: 0.2,
		padding: 10,
		borderRadius: 10,
		fontSize: 18,
	},
});
