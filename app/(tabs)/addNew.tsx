import { AntIcon, MaterialIcon } from "@/components/navigation/TabBarIcon";
import { FC, useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	SafeAreaView,
	Text,
	TouchableHighlight,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import ActiveButton from "@/components/ActiveButton";
import {
	borderRadius,
	borderWidth,
	buttonSize,
	elementHeight,
	elementWidth,
	typesOfExpense,
	typesOfIncome,
} from "@/constants/data";
import Input from "@/components/Input";
import Dropdown from "@/components/Dropdown";
import SelectData from "@/components/SelectData";
import getDays from "@/utils/handleGetDate";
import { CategoryTypes, ParamsDate } from "@/types";
import PopUpModal from "@/components/PopUpModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import createNewItem from "@/utils/createNewItem";
import handleChangeAmount from "@/utils/handleChangeAmount";
import { normalize } from "@/utils/normalizeFont";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n/i18n";

export default function addNew() {
	const [isSelected, setIsSelected] = useState<string>("expenses");
	const [text, setText] = useState<string>("");
	const [selectedCategory, setSelectedCategory] = useState<CategoryTypes>();
	const [amount, setAmount] = useState<string>("");
	const [selectedDate, setSelectedDate] = useState<Date | string>(new Date());
	const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
	const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
	const [isReset, setIsReset] = useState<boolean>(false);
	const id: number = Date.now();
	const params = useLocalSearchParams();
	const { selected, date } = params;

	console.log("date: ", date);
	console.log("selected: ", selected);
	useEffect(() => {
		if (date) {
			setIsSelected(selected);
			setSelectedDate(date);
		}
	}, [selected, date]);

	const addDay = () => {
		if (typeof selectedDate !== "string") {
			const date: string | Date = getDays("add", selectedDate);
			console.log( "DATA: ", date)
			setSelectedDate(date);
		}
	};
	const subDay = () => {
		if (typeof selectedDate !== "string") {
			const date: string | Date = getDays("sub", selectedDate);
			setSelectedDate(date);
		}
	};

	const addItems = async () => {
		const newItem = await createNewItem(
			selectedCategory,
			text,
			selectedDate,
			isSelected,
			amount,
			id
		);

		if (newItem) {
			await AsyncStorage.setItem(isSelected, JSON.stringify(newItem));
			clearItems();
			setShowErrorModal(false);
			setShowSuccessModal(true);
			setIsReset(false);
		} else {
			setShowErrorModal(true);
			setShowSuccessModal(false);
		}
	};

	const clearItems = () => {
		setText("");
		setIsReset(true);
		setAmount("");
		setSelectedDate(new Date());
	};

	const closeModal = () => {
		setShowErrorModal(false);
		setShowSuccessModal(false);
	};

	const { t, i18n, ready } = useTranslation();

	// const typesOfExpense: ExpensesTypes[] = [
	// 		{
	// 			title: t("constantData.dropDownData.title.groceries"),
	// 			icon: require("@/assets/images/shopping-cart.png"),
	// 			color: "#3a86ff",
	// 		},
	// 		{
	// 			title: t("constantData.dropDownData.title.fuel"),
	// 			icon: require("@/assets/images/gas-station.png"),
	// 			color: "#8338ec",
	// 		},
	// 		{
	// 			title: "Wynajem",
	// 			icon: require("@/assets/images/rent.png"),
	// 			color: "#ff006e",
	// 		},
	// 		{
	// 			title: "Restauracja",
	// 			icon: require("@/assets/images/restaurant.png"),
	// 			color: "#fb5607",
	// 		},
	// 		{
	// 			title: "Siłownia",
	// 			icon: require("@/assets/images/gym.png"),
	// 			color: "#ffbe0b",
	// 		},
	// 		{
	// 			title: "Wakacje",
	// 			icon: require("@/assets/images/shopping-cart.png"),
	// 			color: "#22577a",
	// 		},
	// 		{
	// 			title: "Prezent",
	// 			icon: require("@/assets/images/gift.png"),
	// 			color: "#38a3a5",
	// 		},
	// 		{
	// 			title: "Rozrywka",
	// 			icon: require("@/assets/images/shopping-cart.png"),
	// 			color: "#57cc99",
	// 		},
	// 		{
	// 			title: "Kredyt",
	// 			icon: require("@/assets/images/shopping-cart.png"),
	// 			color: "#80ed99",
	// 		},
	// 		{
	// 			title: "Czynsz i media",
	// 			icon: require("@/assets/images/shopping-cart.png"),
	// 			color: "#c7f9cc",
	// 		},
	// 		{
	// 			title: "Inne",
	// 			icon: require("@/assets/images/shopping-cart.png"),
	// 			color: "#b5e2fa",
	// 		},
	// 	];

	return (
		<SafeAreaView style={styles.contener}>
			{showErrorModal && (
				<PopUpModal
					isVisible={showErrorModal}
					changeShowVisible={closeModal}
					kindOfOperation="error"
					message={t("screens.addNew.popUpModal.text.errorMessage")}
				/>
			)}
			{showSuccessModal && (
				<PopUpModal
					isVisible={showSuccessModal}
					changeShowVisible={closeModal}
					kindOfOperation="success"
					message={t("screens.addNew.popUpModal.text.successMessage")}
				/>
			)}
			<Text style={styles.header}>{t("screens.addNew.header")}</Text>
			<TouchableWithoutFeedback
				onPress={Keyboard.dismiss}
				accessible={false}
			>
				<View style={styles.inputContener}>
					<View
						style={[
							styles.buttonsContener,
							{ width: elementWidth, height: elementHeight },
						]}
					>
						<ActiveButton
							title={t("screens.addNew.activeButton.incomes")}
							active={"incomes"}
							onPress={() => setIsSelected("incomes")}
							isSelected={isSelected}
							style={{
								borderRadius: borderRadius,
								width: elementWidth / 2,
								height: elementHeight,
							}}
							activeStyle={{ backgroundColor: "#8EDF85" }}
						/>

						<ActiveButton
							title={t("screens.addNew.activeButton.expenses")}
							active={"expenses"}
							onPress={() => setIsSelected("expenses")}
							isSelected={isSelected}
							style={{
								borderRadius: borderRadius,
								width: elementWidth / 2,
								height: elementHeight,
							}}
							activeStyle={{ backgroundColor: "#DF8592" }}
						/>
					</View>

					<Input
						placeholder={t("screens.addNew.inputs.name")}
						value={text}
						name={t("screens.addNew.inputs.name")}
						style={
							text.length > 2 || text.length == 0
								? null
								: { borderColor: "red" }
						}
						onChangeText={(text: string) => setText(text)}
						keyboardType=""
						maxLength={80}
					/>

					<View>
						<Text style={styles.label}>{t("screens.addNew.inputs.kind")} </Text>
						<Dropdown
							reset={isReset}
							title={t("screens.addNew.dropDown.title")}
							showChevronIcon={true}
							entryData={
								isSelected === "incomes" ? typesOfIncome : typesOfExpense
							}
							onSelect={(selectedCateogry: any, index: number) => {
								setSelectedCategory(selectedCateogry);
							}}
						/>
					</View>

					<Input
						placeholder="0.0"
						value={amount}
						name={t("screens.addNew.inputs.amount")}
						style=""
						onChangeText={(text: any) => {
							const changedAmount = handleChangeAmount(text);
							setAmount(changedAmount);
						}}
						keyboardType="numeric"
						maxLength={11}
					/>

					<View>
						<Text style={styles.label}>{t("screens.addNew.inputs.date")} </Text>
						<SelectData
							style={{
								width: elementWidth,
								height: elementHeight,
								margin: 12,
								borderWidth: borderWidth,
								overflow: "hidden",
							}}
							dateFormat="dd MMMM yyyy"
							defaultValue={selectedDate}
							handleAddDay={addDay}
							handleSubDay={subDay}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
			<View style={styles.buttonContener}>
				<TouchableHighlight
					onPress={addItems}
					underlayColor={"transparent"}
				>
					<View
						style={[
							styles.button,
							{
								backgroundColor: "#89BB7B",
								width: buttonSize,
								height: buttonSize,
							},
						]}
					>
						<AntIcon
							name="plus"
							style={styles.iconStyle}
						/>
					</View>
				</TouchableHighlight>
				<TouchableHighlight
					onPress={clearItems}
					underlayColor={"transparent"}
				>
					<View
						style={[
							styles.button,
							{
								backgroundColor: "#EE4848",
								width: buttonSize,
								height: buttonSize,
							},
						]}
					>
						<MaterialIcon
							name="clear"
							style={styles.iconStyle}
						/>
					</View>
				</TouchableHighlight>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	contener: {
		flex: 1,
		justifyContent: "space-around",
		marginVertical: 40,
	},
	buttonsContener: {
		flexDirection: "row",
		backgroundColor: "#F1F1F1",
		borderRadius: borderRadius,
		borderWidth: borderWidth,
		alignItems: "center",
		justifyContent: "space-between",
		overflow: "hidden",
	},
	header: {
		fontSize: normalize(28),
		alignSelf: "center",
		marginTop: 10,
		fontFamily: "MrtBold",
	},
	inputContener: {
		alignItems: "center",
		gap: 15,
	},
	buttonContener: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 70,
	},

	button: {
		borderRadius: 100,
		color: "white",
		justifyContent: "center",
		alignItems: "center",
	},
	iconStyle: {
		fontSize: normalize(36),
		color: "white",
	},
	label: {
		fontFamily: "Mrt",
		fontSize: normalize(15),
	},
});
