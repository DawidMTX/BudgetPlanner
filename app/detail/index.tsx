import {
	Button,
	FlatList,
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppSelector } from "@/store/store";
import { filterByMonth } from "@/utils/filterData";
import { format } from "date-fns";
import DetailComponent from "./DetailComponent";
import { AntIcon } from "@/components/navigation/TabBarIcon";

const IncomeExpenseDetail = () => {
	const filteredDataByMonth = useAppSelector(
		state => state.manageData.filteredData
	);
	const params = useLocalSearchParams();

	const { category } = params;

	let singleCategoryData: any = [];

	if (filteredDataByMonth) {
		filteredDataByMonth.map((item: any) => {
			if (item["title"].includes(category)) {
				singleCategoryData.push(item);
			}
		});
	}

	const addItems = () => {
		// pomysl o stworzeniu komponentu  wspolnego dla tego elementu i dla addNew
	};

	return (
		<SafeAreaView style={{width: '100%', height: '100%'}}>
			<View>
				{/* <View style={styles.imageContener}>
					<Image
						source={require("@/assets/images/list.png")}
						style={styles.imageStyles}
					/>
				</View> */}
				<ScrollView>
					<View style={{ marginBottom: 70 }}>
						<Text style={styles.titleText}>Kategoria operacji: {category}</Text>

						{singleCategoryData.map((item: any, index: any) => (
							<DetailComponent singleCategoryData={item} />
						))}
					</View>
				</ScrollView>
			</View>
			<View style={styles.addButton}>
				<TouchableHighlight
					onPress={addItems}
					underlayColor={"transparent"}
				>
					<View style={[styles.button, { backgroundColor: "#89BB7B" }]}>
						<AntIcon
							name="plus"
							style={styles.iconStyle}
						/>
					</View>
				</TouchableHighlight>
			</View>
		</SafeAreaView>
	);
};

export default IncomeExpenseDetail;

const styles = StyleSheet.create({
	titleText: {
		fontSize: 20,
		alignSelf: "center",
		padding: 8,
	},
	imageContener: {
		width: "100%",
		height: "100%",
	},
	imageStyles: {
		alignItems: "center",
		alignSelf: "center",
		opacity: 0.1,
	},
	button: {
		width: 70,
		height: 70,
		borderRadius: 100,
		color: "white",
	},
	iconStyle: {
		fontSize: 40,
		padding: 15,
		color: "white",
	},
	addButton: { position: "absolute", bottom: 60, right: 50 },
});
