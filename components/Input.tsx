import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

const Input = ({ ...props}: any) => {
    const {style, onChangeText, value, placeholder, keyboardType} = props
       
	return (
		<View>
			<Text>{props.name} </Text>
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
        
	},
});
