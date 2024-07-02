import { AntIcon, MaterialIcon } from "@/components/navigation/TabBarIcon";
import { useEffect, useRef, useState } from "react";
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
import { typesOfExpense, typesOfIncome } from "@/constants/data";
import Input from "@/components/Input";
import Dropdown from "@/components/Dropdown";
import SelectData from "@/components/SelectData";
import getDays from "@/utils/handleGetDate";
import { CategoryTypes } from "@/types";
import PopUpModal from "@/components/PopUpModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import createNewItem, { handleChangeAmount } from "@/utils/createNewItem";

export default function addNew() {
	const [isSelected, setIsSelected] = useState<string>("expenses");
	const [text, setText] = useState<string | any>("");
	const [selectedCategory, setSelectedCategory] = useState<CategoryTypes>();
	const [amount, setAmount] = useState<string>("");
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
	const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
	const params = useLocalSearchParams();
	const { selected, date }: any = params;

	useEffect(() => {
		if (date) {
			setIsSelected(selected);
			setSelectedDate(date);
		
		}
	}, [selected, date]);

	const addDay = () => {
		const date: any = getDays("add", selectedDate);
		setSelectedDate(date);
	};
	const subDay = () => {
		const date: any = getDays("sub", selectedDate);
		setSelectedDate(date);
	};
	console.log("dd: ", selectedCategory)
	const addItems = async () => {
		const newItem = await createNewItem(
			selectedCategory,
			text,
			selectedDate,
			isSelected,
			amount
		);
	
		if (newItem) {
			await AsyncStorage.setItem(isSelected, JSON.stringify(newItem));
			setShowErrorModal(false);
			setShowSuccessModal(true);
			clearItems();
		} else {
			setShowErrorModal(true);
			setShowSuccessModal(false);
		}
	};

	const clearItems = () => {
		setText("");
		setSelectedCategory({ title: "", icon: "", color: "" });
		setAmount("");
		setSelectedDate(new Date());
	};

	const closeModal = () => {
		setShowErrorModal(false);
		setShowSuccessModal(false);
	};

	return (
		<SafeAreaView style={styles.contener}>
			{showErrorModal && (
				<PopUpModal
					isVisible={showErrorModal}
					changeShowVisible={closeModal}
					kindOfOperation="error"
				/>
			)}
			{showSuccessModal && (
				<PopUpModal
					isVisible={showSuccessModal}
					changeShowVisible={closeModal}
					kindOfOperation="success"
				/>
			)}
			<Text style={styles.header}>Dodaj nowe</Text>
			<TouchableWithoutFeedback
				onPress={Keyboard.dismiss}
				accessible={false}
			>
				<View style={styles.inputContener}>
					<View style={styles.buttonsContener}>
						<ActiveButton
							title="Dochody"
							active={"incomes"}
							onPress={() => setIsSelected("incomes")}
							isSelected={isSelected}
							style={{ borderRadius: 10 }}
							activeStyle={{ backgroundColor: "#8EDF85" }}
						/>

						<ActiveButton
							title="Wydatki"
							active={"expenses"}
							onPress={() => setIsSelected("expenses")}
							isSelected={isSelected}
							style={{ borderRadius: 10 }}
							activeStyle={{ backgroundColor: "#DF8592" }}
						/>
					</View>

					<Input
						placeholder="Nazwa"
						value={text}
						name="Nazwa"
						style={
							text.length > 2 || text.length == 0
								? null
								: { borderColor: "red" }
						}
						onChangeText={(text: string) => setText(text)}
						keyboardType=""
					/>

					<View>
						<Text>Rodzaj: </Text>
						<Dropdown
							title={"Wybierz kategorie"}
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
						name="Kwota:"
						style=""
						onChangeText={(text: any) => {
							const changedAmount = handleChangeAmount(text);
							setAmount(changedAmount);
							
						}}
						keyboardType="numeric"
					/>

					<View>
						<Text>Data: </Text>
						<SelectData
							style={{
								width: 300,
								height: 45,
								margin: 12,
								borderWidth: 0.2,
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
					<View style={[styles.button, { backgroundColor: "#89BB7B" }]}>
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
					<View style={[styles.button, { backgroundColor: "#EE4848" }]}>
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
		width: 300,
		height: 45,
		flexDirection: "row",
		backgroundColor: "#F1F1F1",
		borderRadius: 10,
		borderWidth: 0.2,
		alignSelf: "center",
	},
	header: {
		fontSize: 28,
		alignSelf: "center",
		marginTop: 10,
	},
	inputContener: {
		alignItems: "center",
		gap: 20,
	},
	buttonContener: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 70,
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
});
