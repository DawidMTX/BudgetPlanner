import {
	Button,
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import AsyncStorage from "@react-native-async-storage/async-storage";


const BudgetContener = ({ data }: any) => {

console.log("BudgetContener: ", data)

const removeValue = async () => {
	try {
	  await AsyncStorage.removeItem('expenses')
	} catch(e) {
	  // remove error
	}
  
	console.log('Done.')
  }
console.log(Boolean(data))
	return (
		<ScrollView style={[styles.contener, styles.shadowProp]}>
			<View style={{marginHorizontal: 25, marginVertical: 20}}>
				{!data ? (
				<View style={styles.noDataStyles}>
					<Text>Ups! Nic tutaj nie ma!</Text>
				</View>
			) : (
				<View >
					{data.map((item: any) => (
						<Categories category={item} />
					))}
				</View>
			)}

<TouchableOpacity onPress={removeValue}><Text>Usuń</Text></TouchableOpacity>
			</View>
			
			
		</ScrollView>
	);
};

export default BudgetContener;

const styles = StyleSheet.create({
	contener: {
		gap: 30,
		marginVertical: 5,
		marginHorizontal: 7,
		padding: 0,
		borderRadius: 10,
		backgroundColor: "white",
		flex: 1,
	},
	shadowProp: {
		shadowColor: "#171717",
		shadowOffset: { width: -1, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	noDataStyles: {
		height: 260,
		justifyContent: "center",
		alignItems: "center",
	},
});
