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
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useAppSelector } from "@/store/store";
import DetailComponent from "./DetailComponent";
import { AntIcon } from "@/components/navigation/TabBarIcon";
import AddItemModal from "@/components/AddItemModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SelectCategory } from "@/contexts/SelectCategory";
import { ImageBackground } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getData from "@/utils/storageData";

const IncomeExpenseDetail = () => {
	const router = useRouter();
	const [showModal, setShowModal] = useState<boolean>(false);
	const [refreshing, setRefreshing] = useState(false);
	const [showEditModal, setShowEditModal] = useState<boolean>(false);
	const [editData, setEditData] = useState<any>("");
	const [filteredDataByMonth, setFilteredDataByMonth] = useState(
		useAppSelector(state => state.manageData.filteredData)
	);

	const incomeExpense = useAppSelector(state => state.manageData.isSelected);
	const params = useLocalSearchParams();
	const { setCategory } = useContext(SelectCategory);

	const { category, icon, color, isSelected }: any = params;
	setCategory(category);

	const forceUpdate = async () => {
		const refreshData = await getData(isSelected);

		setFilteredDataByMonth(refreshData);
	};

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
			forceUpdate();
			setRefreshing(false);
		}, 2000);
	}, []);

	const closeModal = () => {
		forceUpdate();
		setShowModal(false);
	};
	const closeEditModal = () => {
		forceUpdate();
		setShowEditModal(false);
	};

	const handleEditItem = (data: any) => {
		setShowEditModal(true);
		setEditData(data);
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
					{showEditModal && (
						<AddItemModal
							isVisible={showEditModal}
							closeModal={closeEditModal}
							selectedItem={editData}
							isSelected={incomeExpense}
							date={editData.date}
							typeOfOperation="edit"
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
										onEdit={handleEditItem}
										onDelete={forceUpdate}
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
