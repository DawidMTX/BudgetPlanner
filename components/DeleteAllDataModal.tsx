import {
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { normalize } from "@/utils/normalizeFont";
import { AntIcon } from "./navigation/TabBarIcon";
import { expenseColor } from "@/constants/Colors";
import { modalBorderRadius } from "@/constants/data";
import PopUpModal from "./PopUpModal";
import deleteAllData from "@/utils/deleteAllData";

const DeleteAllDataModal = ({ isVisible, closeModal }: any) => {
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(isVisible);
	const [showModalMessage, setShowModalMessage] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const [result, setResult] = useState<any>("");

	const deleteData = async () => {
		setShowModalMessage(true);
		try {
			const isSucces = await deleteAllData();
			if (isSucces === "done") {
				setModalMessage("Wszystkie elementy zostały usunięte. ");
			}

			if (isSucces === "error") {
				setModalMessage("Ups! Coś poszło nie tak, spóbuj ponownie pózniej. ");
			}
			setResult(isSucces);
		} catch (error) {
			console.log(error);
			setModalMessage("Ups! Coś poszło nie tak, spóbuj ponownie pózniej. ");
		}
	};

	return (
		<View>
			{showModalMessage ? (
				<PopUpModal
					isVisible={showModalMessage}
					changeShowVisible={closeModal}
					kindOfOperation={result}
					message={modalMessage}
				/>
			) : (
				<Modal
					visible={showDeleteModal}
					animationType="fade"
					transparent={true}
				>
					<TouchableWithoutFeedback
						onPress={closeModal}
						accessible={false}
					>
						<View style={styles.modalContenerBackground}>
							<View style={[styles.modalView, { height: 320 }]}>
								<View style={{ alignItems: "center", padding: 35 }}>
									<AntIcon
										name={"warning"}
										style={{ color: "red" }}
										size={55}
									/>
									<Text style={styles.modalText}>
										Czy na pewno chcesz usunąć wszystkie dane? Ta operacja jest
										nieodwracalna!
									</Text>
								</View>

								<View
									style={{
										flexDirection: "row",
										width: "100%",
									}}
								>
									<TouchableOpacity
										style={[
											styles.deleteButton,
											{ borderBottomLeftRadius: modalBorderRadius },
										]}
										onPress={deleteData}
									>
										<Text style={[styles.textStyle, { color: expenseColor }]}>
											Tak
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={[
											styles.deleteButton,
											{ borderBottomRightRadius: modalBorderRadius },
										]}
										onPress={closeModal}
									>
										<Text style={styles.textStyle}>Nie</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			)}
		</View>
	);
};

export default DeleteAllDataModal;

const styles = StyleSheet.create({
	modalContenerBackground: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.6)",
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: modalBorderRadius,
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
		justifyContent: "space-between",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
		fontSize: normalize(22),
		fontFamily: "MrtMed",
	},
	deleteButton: {
		borderWidth: 0.4,
		width: "50%",
		height: 60,
		backgroundColor: "#f3f2f2",
		overflow: "hidden",
	},
	textStyle: {
		fontWeight: "bold",
		textAlign: "center",
		fontFamily: "MrtBold",
		fontSize: normalize(24),
		padding: 12,
	},
});
