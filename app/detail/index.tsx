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
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppSelector } from "@/store/store";
import { filterByMonth } from "@/utils/filterData";
import { format } from "date-fns";
import DetailComponent from "./DetailComponent";
import { AntIcon } from "@/components/navigation/TabBarIcon";
import PopUpModal from "@/components/PopUpModal";
import AddItemModal from "@/components/AddItemModal";
import createNewItem from "@/utils/createNewItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IncomeExpenseDetail = () => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const filteredDataByMonth = useAppSelector(
		state => state.manageData.filteredData
	);
	const params = useLocalSearchParams();

	const { category, icon, color, isSelected }: any = params;

	let singleCategoryData: any = [];

	if (filteredDataByMonth) {
		filteredDataByMonth.map((item: any) => {
			if (item["title"].includes(category)) {
				singleCategoryData.push(item);
			}
		});
	}
	const selectedCategory = { icon: icon, color: color, title: category };
	const selectedDate = filteredDataByMonth[0].date

	// console.log(filteredDataByMonth[0].date)
	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<SafeAreaView style={{ width: "100%", height: "100%" }}>
			{showModal && (
				<AddItemModal
					isVisible={showModal}
					closeModal={closeModal}
					selectedItem={selectedCategory}
					isSelected={isSelected}
					date={selectedDate}
					typeOfOperation='add'
				/>
			)}

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
					onPress={() => setShowModal(true)}
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