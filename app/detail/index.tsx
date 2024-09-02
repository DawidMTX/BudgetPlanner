import {
	Animated,
	Button,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useAppSelector } from "@/store/store";
import DetailComponent from "./DetailComponent";
import { AntIcon } from "@/components/navigation/TabBarIcon";
import AddItemModal from "@/components/AddItemModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SelectCategory } from "@/contexts/SelectCategory";
import { ImageBackground } from "expo-image";

const IncomeExpenseDetail = () => {
	const router = useRouter();
	const [showModal, setShowModal] = useState<boolean>(false);
	const [refreshing, setRefreshing] = useState(false);
	let filteredDataByMonth = useAppSelector(
		state => state.manageData.filteredData
	);
	const params = useLocalSearchParams();
	const { setCategory } = useContext(SelectCategory);

	const { category, icon, color, isSelected }: any = params;
	setCategory(category);

	useEffect(() => {}, []);

	let singleCategoryData: any = [];

	let selectedDate;

	if (filteredDataByMonth.length > 0) {
		selectedDate = filteredDataByMonth[0].date;
		filteredDataByMonth.map((item: any) => {
			if (item["title"].includes(category)) {
				singleCategoryData.push(item);
			}
		});
	} else {
		router.back();
	}

	const selectedCategory = { icon: icon, color: color, title: category };

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		setTimeout(() => {
			// filteredDataByMonth = useAppSelector(
			// 	state => state.manageData.filteredData
			// );
			setRefreshing(false);
		}, 2000);
	}, []);

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<GestureHandlerRootView>
			<SafeAreaView style={{ width: "100%", height: "100%" }}>
				<ImageBackground
					source={require("@/assets/images/list.png")}
					style={styles.imageStyles}
				>
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
				</ImageBackground>
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
