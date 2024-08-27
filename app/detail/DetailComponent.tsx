import {
	Button,
	Pressable,
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
import {
	Swipeable,
	TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { AntIcon } from "@/components/navigation/TabBarIcon";
import InsetShadow from "@/components/InsetShadow";
import { getFilteredDataByMonth } from "@/store/manageData";
import { TemporaryDataContext } from "@/contexts/TemporaryData";
import { normalize } from "@/utils/normalizeFont";
import { buttonSize } from "@/constants/data";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";

const DetailComponent = ({ singleCategoryData, key }: any) => {
	const [animation, setAnimation] = useState<boolean>(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const incomeExpense = useAppSelector(state => state.manageData.isSelected);
	const filteredDataByMonth = useAppSelector(
		state => state.manageData.filteredData
	);
	const heightA = useSharedValue(80);

	const { temporaryData } = useContext(TemporaryDataContext);
	// USUNAC TEN YSE CONTENT RAZEM Z PROVIDEREM

	useEffect(() => {}, []);
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

	const animationStyle = useAnimatedStyle(() => {
		return {
			// height: withSpring(animate.value.height),
		};
	});
	// dodac tu jescze flexDirection na column i wyregulowac szerokosc i wysokosc elementow

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
					<View
						style={{
							flexShrink: 1,
							height: "85%",
							justifyContent: "space-evenly",
						}}
					>
						<Text style={styles.nameText}>{singleCategoryData.name}</Text>
						<Text style={styles.dateText}>
							{format(singleCategoryData.date, "dd.MM.yyyy")}
						</Text>
					</View>
					<View style={{ flexShrink: 1 }}>
						{incomeExpense == "expenses" ? (
							<Text
								style={{
									fontSize: normalize(20),
									color: redValueColor,
									fontFamily: "MrtMed",
								}}
							>
								{" "}
								- {singleCategoryData.value} zł
							</Text>
						) : (
							<Text
								style={{
									fontSize: normalize(22),
									color: incomeColor,
									fontFamily: "MrtMed",
								}}
							>
								{singleCategoryData.value} zł
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
