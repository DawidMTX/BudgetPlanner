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
	const allExpensesData = useAppSelector(
		state => state.manageData.allExpensesData
	);
	const params = useLocalSearchParams();
	let filteredDataByMonth: any = [];
	const { category, date } = params;
	const router = useRouter();
	let singleCategoryData: any = [];

	if (allExpensesData !== null || undefined) {
		filteredDataByMonth = filterByMonth(allExpensesData, date);
	}
	if (filteredDataByMonth) {
		filteredDataByMonth.map((item: any) => {
			if (item["title"].includes(category)) {
				singleCategoryData.push(item);
			}
		});
	}

	// useEffect(() => {
	// 	console.log("arr: ", singleCategoryData);
	// }, [singleCategoryData]);

	//tutaj odbieram name i pobieram dane z storage wrzocam do pliku ktory filtruje i wyswietlam tylko pasujace dane po nazwie

	return (
		<SafeAreaView>
			<ScrollView style={{height: '100%'}}>
        <Text style={styles.titleText}>Kategoria operacji: {category}</Text>
				<FlatList
					data={singleCategoryData}
					renderItem={({ item }) => (
						<DetailComponent singleCategoryData={item} />
					)}
					keyExtractor={item => item.id}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default IncomeExpenseDetail;

const styles = StyleSheet.create({
  titleText:{
    fontSize: 20,
   alignSelf: 'center',
   padding: 8
  }
});
