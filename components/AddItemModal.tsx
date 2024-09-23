import {
	Alert,
	Keyboard,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AntIcon, MaterialIcon } from "./navigation/TabBarIcon";
import Input from "./Input";
import createNewItem from "@/utils/createNewItem";
import SelectData from "./SelectData";
import getDays from "@/utils/handleGetDate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getData from "@/utils/storageData";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getFilteredDataByMonth } from "@/store/manageData";
import PopUpModal from "./PopUpModal";
import handleChangeAmount from "@/utils/handleChangeAmount";
import validateAmount from "@/utils/validateAmount";
import {
	borderWidth,
	buttonSize,
	elementHeight,
	elementWidth,
	modalBorderRadius,
} from "@/constants/data";
import { normalize } from "@/utils/normalizeFont";
import { AddItemTypes, DataTypes } from "@/types";

const AddItemModal = ({
	isVisible,
	selectedItem,
	closeModal,
	isSelected,
	date,
	typeOfOperation,
}: AddItemTypes) => {
	const [showHideModal, setShowHideModal] = useState<boolean>(isVisible);
	const [amount, setAmount] = useState<string>("");
	const [text, setText] = useState<string | any>("");
	const [selectedDate, setSelectedDate] = useState<Date | string>(new Date());
	const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
	const id: number = Date.now();
	const filteredDataByMonth = useAppSelector(
		state => state.manageData.filteredData
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setSelectedDate(date);

		if (typeOfOperation === "edit") {
			setText(selectedItem.name);
			setAmount(selectedItem.value);
		}
	}, [date]);

	const addDay = () => {
		if (typeof selectedDate === "string") {
			return;
		} else {
			const date: Date | string = getDays("add", selectedDate);
			setSelectedDate(date);
		}
	};
	const subDay = () => {
		if (typeof selectedDate === "string") {
			return;
		} else {
			const date: Date | string = getDays("sub", selectedDate);
			setSelectedDate(date);
		}
	};

	const addItems = async () => {
		const newItem = await createNewItem(
			selectedItem,
			text,
			selectedDate,
			isSelected,
			amount,
			id
		);

		if (newItem) {
			await AsyncStorage.setItem(isSelected, JSON.stringify(newItem));

			setShowErrorModal(false);
			setShowHideModal(false);
			closeModal();
		} else {
			setShowErrorModal(true);
		}

		const handlefastAdd = async () => {
			const numberValue = await validateAmount(amount);
			let createdData: any = selectedItem;

			Object.assign(createdData, { name: text });
			Object.assign(createdData, { value: numberValue });
			Object.assign(createdData, { id: id });
			Object.assign(createdData, { date: selectedDate });
			Object.assign(createdData, { focused: false });

			if (
				createdData &&
				createdData.name.length > 0 &&
				createdData.value.length > 0
			) {
				let handleAddData = [...filteredDataByMonth, createdData];
				dispatch(getFilteredDataByMonth(handleAddData));
			} else {
				setShowErrorModal(true);
			}
		};

		handlefastAdd();
	};

	const editItem = async () => {
		const numberValue = await validateAmount(amount);
		try {
			const allData = await getData(isSelected);

			allData.map((item: DataTypes) => {
				if (
					item["id"] === selectedItem.id &&
					item["name"] === selectedItem.name
				) {
					Object.assign(item, { name: text });
					Object.assign(item, { value: numberValue });
					Object.assign(item, { id: item.id });
					Object.assign(item, { date: selectedDate });
					Object.assign(item, { focused: item.focused });
				}
			});

			AsyncStorage.setItem(isSelected, JSON.stringify(allData));

			filteredDataByMonth.map((item: any) => {
				if (
					item["id"] === selectedItem.id &&
					item["name"] === selectedItem.name
				) {
					Object.assign(item, { name: text });
					Object.assign(item, { value: numberValue });
					Object.assign(item, { id: item.id });
					Object.assign(item, { date: selectedDate });
					Object.assign(item, { focused: item.focused });
				}
			});
			dispatch(getFilteredDataByMonth(filteredDataByMonth));
		} catch (error) {}

		closeModal();
	};

	return (
		<View>
			{showErrorModal && (
				<PopUpModal
					isVisible={showErrorModal}
					changeShowVisible={closeModal}
					kindOfOperation="error"
					message="Prosze, uzupełnij wszystkie pola. "
				/>
			)}
			<Modal
				visible={showHideModal}
				animationType="fade"
				transparent={true}
			>
				<TouchableWithoutFeedback
					onPress={Keyboard.dismiss}
					accessible={false}
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
								{typeOfOperation === "add" ? (
									<Text style={styles.modalText}>Dodaj nowy element:</Text>
								) : (
									<Text style={styles.modalText}>Edytuj elementy:</Text>
								)}

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
									maxLength={80}
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
									maxLength={11}
								/>
								<View>
									<Text style={{ fontFamily: "Mrt" }}>Data: </Text>
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
								<View style={styles.buttonContener}>
									<TouchableHighlight
										onPress={typeOfOperation === "add" ? addItems : editItem}
										underlayColor={"transparent"}
									>
										<View
											style={[styles.button, { backgroundColor: "#89BB7B" }]}
										>
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
										<View
											style={[styles.button, { backgroundColor: "#EE4848" }]}
										>
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
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	);
};

export default AddItemModal;

const styles = StyleSheet.create({
	modalText: {
		marginBottom: 15,
		textAlign: "center",
		fontSize: normalize(26),
		fontFamily: "MrtMed",
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
		borderRadius: modalBorderRadius,
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
		width: "88%",
		height: "66%",
		justifyContent: "space-between",
	},
	iconStyle: {
		fontSize: normalize(36),
		color: "white",
	},
	button: {
		width: buttonSize,
		height: buttonSize,
		borderRadius: 100,
		color: "white",
		justifyContent: "center",
		alignItems: "center",
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
		fontFamily: "MrtBold",
	},
	buttonCloseErrorStyle: {
		borderRadius: 10,
		paddingVertical: 15,
		paddingHorizontal: 45,
		elevation: 2,
	},
});
