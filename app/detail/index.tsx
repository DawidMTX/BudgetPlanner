import {
	Dimensions,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	TouchableHighlight,
	View,
} from "react-native";
import React, {  useContext, useState } from "react";
import {  useLocalSearchParams, useRouter } from "expo-router";
import { useAppSelector } from "@/store/store";
import DetailComponent from "./DetailComponent";
import { AntIcon } from "@/components/navigation/TabBarIcon";
import AddItemModal from "@/components/AddItemModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SelectCategory } from "@/contexts/SelectCategory";
import { Image} from "expo-image";
import getData from "@/utils/storageData";
import { CategoryTypes, DataTypes } from "@/types";

const IncomeExpenseDetail = () => {
	const router = useRouter();
	const [showModal, setShowModal] = useState<boolean>(false);
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const [showEditModal, setShowEditModal] = useState<boolean>(false);
	const [editData, setEditData] = useState<DataTypes | string>("");
	const [filteredDataByMonth, setFilteredDataByMonth] = useState(
		useAppSelector(state => state.manageData.filteredData)
	);
	const incomeExpense = useAppSelector(state => state.manageData.isSelected);
	const params = useLocalSearchParams();
	const { setCategory } = useContext(SelectCategory);

	const { category, icon, color, isSelected }: any = params;
	setCategory(category);

	const screenWidth = Dimensions.get("screen").width;
	const screenHeight = Dimensions.get("screen").height;

	const forceUpdate = async () => {
		const refreshData = await getData(isSelected);

		setFilteredDataByMonth(refreshData);
	};

	let singleCategoryData: Array<DataTypes> = [];

	if (filteredDataByMonth.length > 0) {
		filteredDataByMonth.map((item: DataTypes) => {
			if (item["title"].includes(category)) {
				singleCategoryData.push(item);
			}
		});
	} else {
		router.back();
	}

	const selectedCategory:CategoryTypes = { icon: icon, color: color, title: category };

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

	const handleEditItem = (data: DataTypes) => {
		setShowEditModal(true)
		console.log("editData: ", data)
		setEditData(data);
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
						date={new Date()}
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
						<Image
							source={require("@/assets/images/document.png")}
							style={[styles.imageStyles, {top: screenHeight/2 - 200, left: screenWidth/2 - 140}]}
							contentFit="contain"
						/>
						<View style={{ marginBottom: 70 }}>
							{singleCategoryData.map((item: DataTypes, index: number) => (
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
		width: 280,
		height: 280,
		opacity: 0.1,
		position: "absolute",
		
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
