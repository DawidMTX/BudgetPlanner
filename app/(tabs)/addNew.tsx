import {
	AntIcon,
	MaterialIcon,
} from "@/components/navigation/TabBarIcon";
import {  useState } from "react";
import {
	StyleSheet,
	View,
	SafeAreaView,
	Text,
	TouchableHighlight
} from "react-native";

import ActiveButton from "@/components/ActiveButton";
import { typesOfExpense, typesOfIncome } from "@/constants/data";
import Input from "@/components/Input";
import Dropdown from "@/components/Dropdown";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import SelectData from "@/components/SelectData";
import getDays from "@/utils/handleGetDate";
import { AllDataTypes, CategoryTypes } from "@/types";
import PopUpModal from "@/components/PopUpModal";
import  getData  from "@/utils/storageData";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function addNew() {
	const [isSelected, setIsSelected] = useState<string>("expenses");
	const [text, setText] = useState<string | any>("");
	const [selectedCategory, setSelectedCategory] = useState<CategoryTypes>();
	const [amount, setAmount] = useState<string>("");
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
	const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);


	const addDay = () => {
		const date: any = getDays("add", selectedDate);
		setSelectedDate(date);
	};
	const subDay = () => {
		const date: any = getDays("sub", selectedDate);
		setSelectedDate(date);
	};

	const handleChangeAmount = (text: any) => {
		const numericValue = text
			.replace(/[^.\d]/g, "")
			.replace(/^(\d*\.?)|(\d*)\.?/g, "$1$2");

		setAmount(numericValue);
	};

	const changeNumberValue = () => {
		let cost;

		const dot = amount.toString().indexOf(".");
		if (dot > 0) {
			return (cost = amount.slice(0, dot + 3));
		} else cost = amount;

		return cost;
	};

	const addItems = async () => {
		const numberValue = await changeNumberValue();
		
		try {
			let createdData: any = selectedCategory;
			Object.assign(createdData, { name: text });
			Object.assign(createdData, { value: numberValue });
			Object.assign(createdData, { id: Math.floor(Math.random() * 100) });
			Object.assign(createdData, { date: selectedDate });
			Object.assign(createdData, { focused: false });

			if (
				createdData &&
				createdData.name.length > 0 &&
				createdData.value.length > 0
			) {
				const dataFromStorage = await getData(isSelected)
				let arr = [... dataFromStorage, createdData]
				await AsyncStorage.setItem(isSelected, JSON.stringify(arr));
				setShowErrorModal(false);
				setShowSuccessModal(true);
				clearItems();
				
			} else {
				setShowErrorModal(true);
				setShowSuccessModal(false);
			}
		} catch (error) {
			setShowErrorModal(true);
			setShowSuccessModal(false);
			console.log("Error from addNew", error);
		}
	};

	const clearItems = () => {
		setText("");
		setSelectedCategory({ title: "", icon: "", color: "" });
		setAmount("");
		setSelectedDate(new Date());
	};

	return (
		<SafeAreaView style={styles.contener}>
			{showErrorModal && <PopUpModal isVisible={showErrorModal}/>}
			<Text style={styles.header}>Dodaj nowe</Text>

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
						text.length > 2 || text.length == 0 ? null : { borderColor: "red" }
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
					onChangeText={(text: any) => handleChangeAmount(text)}
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
