import {
	AntIcon,
	MaterialIcon,
	TabBarIcon,
} from "@/components/navigation/TabBarIcon";
import { useState } from "react";
import {
	StyleSheet,
	View,
	SafeAreaView,
	Text,
	TouchableHighlight,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { addDays, format } from "date-fns";

import ActiveButton from "@/components/ActiveButton";
import { typesOfIncome } from "@/constants/data";
import DateSelection from "@/components/DateSelection";
import Input from "@/components/Input";
import Dropdown from "@/components/Dropdown";

export default function addNew() {
	const [isSelected, setIsSelected] = useState<string>("expenses");
	const [text, setText] = useState<string | any>("");
	const [selectedItem, setSelectedItem] = useState("");
	const [amount, setAmount] = useState<string>("");
	const [selectedDate, setSelectedDate] = useState(format(new Date(), "dd-MM-yyyy"));

	const [allData, setAllData] = useState<Array<object>>([]);
	const [selectedLanguage, setSelectedLanguage] = useState();

	const handleAddName = (text: string) => {
		setText(text);
	};

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
		data.id = Math.floor(Math.random() * 100);
		data.date = selectedDate;
		data.focused = false;
		console.log(data[1]);

		if (data.length !== 0) {
			setAllData([data]);
		}
	};

	return (
		<SafeAreaView style={styles.contener}>
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
					onChangeText={(text: string) => handleAddName(text)}
				/>

				<View>
					<Text>Rodzaj: </Text>
					<Dropdown
					title={"Wybierz kategorie"}
					showChevronIcon={true}
						data={typesOfIncome}
						onSelect={(selectedItem: any, index: number) => {
							setSelectedItem(selectedItem);
						}}
					/>
				</View>

				<Input
					placeholder="0.0"
					value={amount}
					name="Kwota:"
					style=""
					onChangeText={({ text }: any) => handleChangeAmount(text)}
					keyboardType="numeric"
				/>

				<View>
					<Text>Data: </Text>
					<Dropdown
					title={selectedDate}
					showChevronIcon={false}
						data={typesOfIncome}
						onSelect={(selectedData: any, index: number) => {
							setSelectedDate(selectedDate);
						}}
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
