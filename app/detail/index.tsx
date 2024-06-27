import {
	Button,
	FlatList,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppSelector } from "@/store/store";
import { filterByMonth } from "@/utils/filterData";
import { format } from "date-fns";
import DetailComponent from "./DetailComponent";

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


	return (
		<SafeAreaView>
			<View style={{ height: "100%" }}>
				<Text style={styles.titleText}>Kategoria operacji: {category}</Text>
				<FlatList
					data={singleCategoryData}
					renderItem={({ item }) => (
						<DetailComponent singleCategoryData={item} />
					)}
					keyExtractor={item => item.id}
				/>
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
});
