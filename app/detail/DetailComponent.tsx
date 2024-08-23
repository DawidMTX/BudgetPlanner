import {
	Animated,
	Button,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { incomeColor, redValueColor } from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/store/store";
import getData from "@/utils/storageData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddItemModal from "@/components/AddItemModal";
import { Swipeable } from "react-native-gesture-handler";
import { AntIcon } from "@/components/navigation/TabBarIcon";
import InsetShadow from "@/components/InsetShadow";
import { getFilteredDataByMonth } from "@/store/manageData";
import { TemporaryDataContext } from "@/contexts/TemporaryData";
import { normalize } from "@/utils/normalizeFont";

const DetailComponent = ({ singleCategoryData, key }: any) => {
	const [showEditModal, setShowEditModal] = useState(false);
	const incomeExpense = useAppSelector(state => state.manageData.isSelected);
	const filteredDataByMonth = useAppSelector(
		state => state.manageData.filteredData
	);
	const { temporaryData } = useContext(TemporaryDataContext);
	// USUNAC TEN YSE CONTENT RAZEM Z PROVIDEREM

	useEffect(() => {
		
	},[])
	// ZROBIC ODSWIERZANIE ELEMENTU ABY POBIERALO JESCZE RAZ FILTERED DATA BY MONTH I ZROBIC REFRESHING ( INDEX.TSX)
	// pomysl o refresch na zasadzie useEffect a jako zaleznosc cos tam dodac, to wtedy komponent sie odswirzt
	const swipeableRef = useRef<any>(null);

	const dispatch = useAppDispatch();

	const closeSwipeable = () => {
		swipeableRef.current.close();
	};

	const rightSwipe = () => {
		return (
			<TouchableOpacity
				onPress={deleteItem}
				activeOpacity={0.6}
				style={{ marginVertical: 1, backgroundColor: "#e63946" }}
			>
				<InsetShadow>
					<View style={[styles.deleteBox, { backgroundColor: "#e63946" }]}>
						<Animated.Text>
							<AntIcon
								name="delete"
								style={{ color: "white", fontSize: 26 }}
							/>
						</Animated.Text>
					</View>
				</InsetShadow>
			</TouchableOpacity>
		);
	};
	const leftSwipe = () => {
		return (
			<TouchableOpacity
				onPress={editItem}
				activeOpacity={0.6}
				style={{ marginVertical: 1 }}
			>
				<InsetShadow>
					<View style={[styles.deleteBox, { backgroundColor: "#ffbe0b" }]}>
						<Animated.Text>
							<AntIcon
								name="edit"
								style={{ color: "white", fontSize: 26 }}
							/>
						</Animated.Text>
					</View>
				</InsetShadow>
			</TouchableOpacity>
		);
	};

	const deleteItem = async () => {
		try {
			const allData = await getData(incomeExpense);

			const filteredData = allData.filter((item: any) => {
				return item.id !== singleCategoryData.id;
			});
			AsyncStorage.setItem(incomeExpense, JSON.stringify(filteredData));
			const handleShowData = filteredDataByMonth.filter((item: any) => {
				return item.id !== singleCategoryData.id;
			});
			dispatch(getFilteredDataByMonth(handleShowData));
		} catch (error) {}
		closeSwipeable();
	};

	const editItem = () => {
		setShowEditModal(true);
		// if (!showEditModal) {
		// 	singleCategoryData = temporaryData;
		// 	console.log("single :", temporaryData);
		// }
	};

	const closeModal = () => {
		setShowEditModal(false);
	};
	return (
		<Swipeable
			ref={swipeableRef}
			renderRightActions={rightSwipe}
			renderLeftActions={leftSwipe}
		>
			<View style={styles.contener}>
				{showEditModal && (
					<AddItemModal
						isVisible={showEditModal}
						closeModal={closeModal}
						selectedItem={singleCategoryData}
						isSelected={incomeExpense}
						date={singleCategoryData.date}
						typeOfOperation="edit"
					/>
				)}
				<View>
					<Text style={styles.nameText}>{singleCategoryData.name}</Text>
					<Text style={styles.dateText}>
						{format(singleCategoryData.date, "dd.MM.yyyy")}
					</Text>
				</View>
				<View>
					{incomeExpense == "expenses" ? (
						<Text style={{ fontSize: 22, color: redValueColor, fontFamily: 'MrtMed' }}>
							{" "}
							- {singleCategoryData.value} zł
						</Text>
					) : (
						<Text style={{ fontSize: 22, color: incomeColor, fontFamily: 'MrtMed'  }}>
							{singleCategoryData.value} zł
						</Text>
					)}
				</View>
			</View>
		</Swipeable>
	);
};

export default DetailComponent;

const styles = StyleSheet.create({
	contener: {
		borderWidth: 0.2,
		borderColor: "#ccc",
		height: 80,
		marginVertical: 1,
		backgroundColor: "#fff",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 20,
		alignItems: "center",
	},
	valueText: {
		fontSize: normalize(30),
		fontFamily: 'MrtMed'
	},
	nameText: {
		fontSize: normalize(28),
		fontFamily: 'MrtMed'
	},
	dateText: {
		fontSize: normalize(15),
		fontFamily: 'Mrt'
	},
	deleteBox: {
		justifyContent: "center",
		alignItems: "center",
		width: 100,
		height: "100%",
	},
});
