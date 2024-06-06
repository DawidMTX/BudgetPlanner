import {
	AntIcon,
	MaterialIcon,
	TabBarIcon,
} from "@/components/navigation/TabBarIcon";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
	StyleSheet,
	Image,
	Platform,
	View,
	SafeAreaView,
	Text,
	TextInput,
	Button,
	TouchableHighlight,
	TouchableOpacity,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { addDays, format } from "date-fns";

import ActiveButton from "@/components/ActiveButton";
import { typesOfIncome } from "@/constants/data";


export default function addNew() {
	const [text, setText] = useState<string | any>("");
	const [amount, setAmount] = useState<string>("");
	const [date, setDate] = useState(format(new Date(), "MM-dd-yyyy"));
	const [isSelected, setIsSelected] = useState<string>("expenses");
	const [selectedItem, setSelectedItem] = useState('')
	const [allData, setAllData ] = useState<Array<object>>([])

	

	const handleChangeAmount = (text: any) => {
		const numericValue = text.replace(/[^0-9]/g, "");
		setAmount(numericValue);
	};

	const handleChangeDate = () => {
		// const changeDate = addDays(date, 1)
		// setDate(changeDate)
	};

	const addItems = () => {
		let data: any = selectedItem;
		data.name = text;
		data.value = amount;
		data.id = Math.floor(Math.random() * 100)
		data.date = date 
		data.focused = false;
		console.log(data[1])

		if (data.length !== 0){
			setAllData([data])
		}
	};

	const showIncome = () => {
		setIsSelected("incomes");
	};

	const showExpenses = () => {
		setIsSelected("expenses");
	};

	return (
		<SafeAreaView style={styles.contener}>
			<Text style={styles.header}>Dodaj nowe</Text>

			<View style={styles.inputContener}>
				<View style={styles.buttonsContener}>
					<ActiveButton
						title="Dochody"
						active={"incomes"}
						onPress={showIncome}
						isSelected={isSelected}
						style={{ borderRadius: 10 }}
						activeStyle={{ backgroundColor: "#8EDF85" }}
					/>
					<ActiveButton
						title="Wydatki"
						active={"expenses"}
						onPress={showExpenses}
						isSelected={isSelected}
						style={{ borderRadius: 10 }}
						activeStyle={{ backgroundColor: "#DF8592" }}
					/>
				</View>
				<View>
					<Text>Nazwa: </Text>
					<TextInput
						style={styles.input}
						onChangeText={text => setText(text)}
						value={text}
						placeholder="Nazwa"
					/>
				</View>

				<View>
					<Text>Rodzaj: </Text>
					<SelectDropdown
						data={typesOfIncome}
						onSelect={(selectedItem, index) => {
							setSelectedItem(selectedItem)
						}}
						renderButton={(selectedItem, isOpened) => {
							return (
								<View style={styles.dropdownButtonStyle}>
									{selectedItem && (
										<TabBarIcon
											name={selectedItem.icon}
											style={styles.dropdownButtonIconStyle}
										/>
									)}
									<Text style={styles.dropdownButtonTxtStyle}>
										{(selectedItem && selectedItem.title) || "Wybierz wydatek"}
									</Text>
									<TabBarIcon
										name={isOpened ? "chevron-up" : "chevron-down"}
										style={styles.dropdownButtonArrowStyle}
									/>
								</View>
							);
						}}
						renderItem={(item, index, isSelected) => {
							return (
								<View
									style={{
										...styles.dropdownItemStyle,
										...(isSelected && { backgroundColor: "#D2D9DF" }),
									}}
								>
									<Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
								</View>
							);
						}}
						showsVerticalScrollIndicator={false}
						dropdownStyle={styles.dropdownMenuStyle}
					/>
				</View>
				<View>
					<Text>Kwota: </Text>
					<TextInput
						style={styles.input}
						onChangeText={handleChangeAmount}
						value={amount}
						placeholder="0.0"
						keyboardType="numeric"
					/>
				</View>
				<View>
					<Text>Data: </Text>
					<TextInput
						style={styles.input}
						onChange={handleChangeDate}
						value={date}
						placeholder={date}
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
					onPress={addItems}
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
	input: {
		width: 300,
		height: 45,
		margin: 12,
		borderWidth: 0.2,
		padding: 10,
		borderRadius: 10,
	},
	dropdownButtonStyle: {
		width: 300,
		height: 45,
		borderWidth: 0.2,
		borderRadius: 10,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 12,
		margin: 12,
	},
	dropdownButtonTxtStyle: {
		flex: 1,
		fontSize: 18,
		fontWeight: "500",
		color: "#151E26",
	},
	dropdownButtonArrowStyle: {
		fontSize: 28,
	},
	dropdownButtonIconStyle: {
		fontSize: 28,
		marginRight: 8,
	},
	dropdownMenuStyle: {
		backgroundColor: "#E9ECEF",
		borderRadius: 8,
	},
	dropdownItemStyle: {
		width: "100%",
		flexDirection: "row",
		paddingHorizontal: 12,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 8,
	},
	dropdownItemTxtStyle: {
		flex: 1,
		fontSize: 18,
		fontWeight: "500",
		color: "#151E26",
	},
	dropdownItemIconStyle: {
		fontSize: 28,
		marginRight: 8,
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
