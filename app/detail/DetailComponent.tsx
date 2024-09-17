import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { incomeColor, redValueColor } from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/store/store";
import getData from "@/utils/storageData";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
	Swipeable,
	TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { AntIcon } from "@/components/navigation/TabBarIcon";
import InsetShadow from "@/components/InsetShadow";
import { getFilteredDataByMonth } from "@/store/manageData";

import { normalize } from "@/utils/normalizeFont";

import Animated, {
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";

const DetailComponent = ({
	singleCategoryData,
	key,
	onEdit,
	onDelete,
}: any) => {
	const [animation, setAnimation] = useState<boolean>(false);
	const incomeExpense = useAppSelector(state => state.manageData.isSelected);
	const filteredDataByMonth = useAppSelector(
		state => state.manageData.filteredData
	);
	const heightA = useSharedValue(80);
	const { t } = useTranslation();

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
				onPress={() => {
					onEdit(singleCategoryData);
					closeSwipeable();
				}}
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
		onDelete();
	};

	useEffect(() => {
		if (animation) {
			heightA.value = withSpring(220);
		} else {
			heightA.value = withSpring(80);
		}
	}, [animation]);

	return (
		<Swipeable
			ref={swipeableRef}
			renderRightActions={rightSwipe}
			renderLeftActions={leftSwipe}
		>
			<TouchableWithoutFeedback onPress={() => setAnimation(!animation)}>
				<Animated.View
					style={[
						styles.contener,
						animation ? { flexDirection: "column" } : { flexDirection: "row" },
						{ height: heightA },
					]}
				>
					{/* {showEditModal && (
						<AddItemModal
							isVisible={showEditModal}
							closeModal={closeModal}
							selectedItem={singleCategoryData}
							isSelected={incomeExpense}
							date={singleCategoryData.date}
							typeOfOperation="edit"
						/>
					)} */}
					<View
						style={[
							animation && { alignSelf: "flex-start" },
							{
								flexShrink: 2,
								height: "85%",
								justifyContent: "space-evenly",
							},
						]}
					>
						<Text style={styles.nameText}>{singleCategoryData.name}</Text>
						<Text style={styles.dateText}>
							{format(singleCategoryData.date, "dd.MM.yyyy")}
						</Text>
					</View>
					<View style={{ flexShrink: 0 }}>
						{incomeExpense == "expenses" ? (
							<Text
								style={{
									fontSize: normalize(20),
									color: redValueColor,
									fontFamily: "MrtMed",
								}}
							>
								{" "}
								- {singleCategoryData.value}{" "}
								{t("screens.home.categories.text.currency")}
							</Text>
						) : (
							<Text
								style={{
									fontSize: normalize(22),
									color: incomeColor,
									fontFamily: "MrtMed",
								}}
							>
								{singleCategoryData.value}{" "}
								{t("screens.home.categories.text.currency")}
							</Text>
						)}
					</View>
				</Animated.View>
			</TouchableWithoutFeedback>
		</Swipeable>
	);
};

export default DetailComponent;

const styles = StyleSheet.create({
	contener: {
		borderWidth: 0.2,
		borderColor: "#ccc",
		gap: 20,
		marginVertical: 1,
		backgroundColor: "#fff",
		justifyContent: "space-between",
		padding: 20,
		alignItems: "center",
	},
	valueText: {
		fontSize: normalize(25),
		fontFamily: "MrtMed",
	},
	nameText: {
		fontSize: normalize(22),
		fontFamily: "MrtMed",
		flexGrow: 100,
		height: "100%",
	},
	dateText: {
		fontSize: normalize(13),
		fontFamily: "Mrt",
	},
	deleteBox: {
		justifyContent: "center",
		alignItems: "center",
		width: 100,
		height: "100%",
	},
});
