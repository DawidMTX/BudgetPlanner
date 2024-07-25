import {
	Animated,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useAppSelector } from "@/store/store";
import DetailComponent from "./DetailComponent";
import { AntIcon } from "@/components/navigation/TabBarIcon";
import AddItemModal from "@/components/AddItemModal";
import {
	GestureHandlerRootView,
	RefreshControl,
} from "react-native-gesture-handler";
import { SelectCategory } from "@/contexts/SelectCategory";

const IncomeExpenseDetail = () => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [refreshing, setRefreshing] = useState(false);
	const filteredDataByMonth = useAppSelector(
		state => state.manageData.filteredData
	);
	const params = useLocalSearchParams();
	const { setCategory } = useContext(SelectCategory);

	const { category, icon, color, isSelected }: any = params;
	setCategory(category);
	let singleCategoryData: any = [];

	filteredDataByMonth.map((item: any) => {
		if (item["title"].includes(category)) {
			singleCategoryData.push(item);
		}
	});

	const selectedCategory = { icon: icon, color: color, title: category };
	const selectedDate = filteredDataByMonth[0].date;

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<GestureHandlerRootView>
			<SafeAreaView style={{ width: "100%", height: "100%" }}>
				{showModal && (
					<AddItemModal
						isVisible={showModal}
						closeModal={closeModal}
						selectedItem={selectedCategory}
						isSelected={isSelected}
						date={selectedDate}
						typeOfOperation="add"
					/>
				)}

				<View>
					{/* <View style={styles.imageContener}>
					<Image
						source={require("@/assets/images/list.png")}
						style={styles.imageStyles}
					/>
				</View> */}
					<ScrollView
						style={{ height: "100%" }}
						refreshControl={
							<RefreshControl
								refreshing={refreshing}
								onRefresh={onRefresh}
							/>
						}
					>
						<View style={{ marginBottom: 70 }}>
							{singleCategoryData.map((item: any, index: any) => (
								<DetailComponent
									singleCategoryData={item}
									key={index}
								/>
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
		</GestureHandlerRootView>
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
