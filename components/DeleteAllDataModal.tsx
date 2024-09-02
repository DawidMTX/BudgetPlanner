import {
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import React, { useState } from "react";
import { normalize } from "@/utils/normalizeFont";
import { AntIcon } from "./navigation/TabBarIcon";
import { expenseColor } from "@/constants/Colors";
import { modalBorderRadius } from "@/constants/data";
import PopUpModal from "./PopUpModal";
import deleteAllData from "@/utils/deleteAllData";
import { useTranslation } from "react-i18next";

const DeleteAllDataModal = ({ isVisible, closeModal }: any) => {
	const {t} = useTranslation()
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(isVisible);
	const [showModalMessage, setShowModalMessage] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const [result, setResult] = useState<any>("");

	const deleteData = async () => {
		setShowModalMessage(true);
		try {
			const isSucces = await deleteAllData();
			if (isSucces === "done") {
				setModalMessage(t("screens.settings.deleteAllModal.done"));
			}

			if (isSucces === "error") {
				setModalMessage(t("screens.settings.deleteAllModal.error"));
			}
			setResult(isSucces);
		} catch (error) {
			console.log(error);
			setModalMessage(t("screens.settings.deleteAllModal.error"));
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
								<View style={{ alignItems: "center", padding: 35, gap: 20 }}>
									<AntIcon
										name={"warning"}
										style={{ color: "red" }}
										size={55}
									/>
									<Text style={styles.modalText}>
										{t("screens.settings.deleteAllModal.text.message")}
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
										{t("screens.settings.deleteAllModal.text.accept")}
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={[
											styles.deleteButton,
											{ borderBottomRightRadius: modalBorderRadius },
										]}
										onPress={closeModal}
									>
										<Text style={styles.textStyle}>{t("screens.settings.deleteAllModal.text.reject")}</Text>
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
		backgroundColor: "#f9f8f8",
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
