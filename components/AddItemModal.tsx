import {
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntIcon, MaterialIcon } from "./navigation/TabBarIcon";
import Input from "./Input";
import createNewItem, { handleChangeAmount } from "@/utils/createNewItem";
import SelectData from "./SelectData";
import getDays from "@/utils/handleGetDate";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddItemModal = ({
	isVisible,
	selectedCategory,
	closeModal,
	isSelected,
	date,
}: any) => {
	const [showHideModal, setShowHideModal] = useState(isVisible);
	const [amount, setAmount] = useState<string>("");
	const [text, setText] = useState<string | any>("");
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

	useEffect(() => {
		setSelectedDate(date);
	}, [date]);

	const addDay = () => {
		const date: any = getDays("add", selectedDate);
		setSelectedDate(date);
	};
	const subDay = () => {
		const date: any = getDays("sub", selectedDate);
		setSelectedDate(date);
	};

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

			setShowHideModal(false);
		} else {
			setShowErrorModal(true);
			// setShowSuccessModal(false);
		}
	};
	return (
		<View>
			<Modal
				visible={showHideModal}
				animationType="fade"
				transparent={true}
			>
				<View style={styles.centeredView}>
					{showErrorModal ? (
						<View style={[styles.modalView, { height: 300 }]}>
							<AntIcon
								name={"warning"}
								style={{ color: "red" }}
								size={55}
							/>
							<Text style={styles.modalText}>
								Prosze, uzupelnij wszystkie pola.
							</Text>

							<Pressable
								style={[styles.buttonCloseErrorStyle, styles.buttonClose]}
								onPress={() => setShowErrorModal(false)}
							>
								<Text style={styles.textStyle}>Ok</Text>
							</Pressable>
						</View>
					) : (
						<View style={styles.modalView}>
							<Text style={styles.modalText}>Dodaj nowy element:</Text>
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
									onPress={closeModal}
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
						</View>
					)}
				</View>
			</Modal>
		</View>
	);
};

export default AddItemModal;

const styles = StyleSheet.create({
	modalText: {
		marginBottom: 15,
		textAlign: "center",
		fontSize: 26,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.6)",
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		width: 340,
		height: 490,
		justifyContent: "space-between",
	},
	iconStyle: {
		fontSize: 40,
		padding: 15,
		color: "white",
	},
	button: {
		width: 70,
		height: 70,
		borderRadius: 100,
		color: "white",
	},
	buttonContener: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 70,
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	buttonCloseErrorStyle: {
		borderRadius: 10,
		paddingVertical: 15,
		paddingHorizontal: 45,
		elevation: 2,
	},
	
});
