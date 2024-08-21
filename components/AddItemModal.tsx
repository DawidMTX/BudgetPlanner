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
import { TemporaryDataContext } from "@/contexts/TemporaryData";

const AddItemModal = ({
	isVisible,
	selectedItem,
	closeModal,
	isSelected,
	date,
	typeOfOperation,
}: any) => {
	const [showHideModal, setShowHideModal] = useState(isVisible);
	const [amount, setAmount] = useState<string>("");
	const [text, setText] = useState<string | any>("");
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
	const id = Date.now()
	const filteredDataByMonth = useAppSelector(
		state => state.manageData.filteredData
	);
	const dispatch = useAppDispatch();
	const { setTemporaryData } = useContext(TemporaryDataContext);

	useEffect(() => {
		setSelectedDate(date);
		if (typeOfOperation === "edit") {
			setText(selectedItem.name);
			setAmount(selectedItem.value);
		}
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

			allData.map((item: any) => {
				if (
					item["id"] === selectedItem.id &&
					item["name"] === selectedItem.name
				) {
					Object.assign(item, { name: text });
					Object.assign(item, { value: numberValue });
					Object.assign(item, { id: item.id });
					Object.assign(item, { date: selectedDate });
					Object.assign(item, { focused: item.focused });
					console.log('ItemL: ',item)
					setTemporaryData(item)
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
									<Text style={{fontFamily: "Mrt"}}>Data: </Text>
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
		fontSize: 26,
		fontFamily: 'MrtMed'
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
		fontFamily: 'MrtBold'
	},
	buttonCloseErrorStyle: {
		borderRadius: 10,
		paddingVertical: 15,
		paddingHorizontal: 45,
		elevation: 2,
	},
});
