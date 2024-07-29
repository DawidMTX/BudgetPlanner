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
	GestureHandlerRootView
} from "react-native-gesture-handler";
import { SelectCategory } from "@/contexts/SelectCategory";
import { ImageBackground } from "expo-image";

const IncomeExpenseDetail = () => {
	const router = useRouter();
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

	let selectedDate = filteredDataByMonth[0].date;

	filteredDataByMonth.map((item: any) => {
		if (item["title"].includes(category)) {
			singleCategoryData.push(item);
		}
	});

	// useEffect(() => {
	// 	if (singleCategoryData.length <= 0) {
	// 		router.back();
	// 	} else {
	// 		selectedDate = filteredDataByMonth[0].date;
	// 	}
	// }, [singleCategoryData]);

	const selectedCategory = { icon: icon, color: color, title: category };

	// const onRefresh = React.useCallback(() => {
	// 	setRefreshing(true);

	// 	setTimeout(() => {
	// 		setRefreshing(false);
	// 	}, 2000);
	// }, []);

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<ImageBackground
			source={require("@/assets/images/list.png")}
			style={styles.imageStyles}
		>
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
						<ScrollView
							style={{ height: "100%" }}
							// refreshControl={
							// 	<RefreshControl
							// 		refreshing={refreshing}
							// 		onRefresh={onRefresh}
							// 	/>
							// }
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
		</ImageBackground>
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
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center",
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
