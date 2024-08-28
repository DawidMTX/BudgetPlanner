import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { AntIcon } from "./navigation/TabBarIcon";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { modalBorderRadius } from "@/constants/data";

const PopUpModal = ({
	isVisible,
	changeShowVisible,
	kindOfOperation,
	message,
}: any) => {
	const [showHideModal, setShowHideModal] = useState(isVisible);

	if (kindOfOperation == "success") {
		setTimeout(() => {
			changeShowVisible();
			router.push("/(tabs)");
		}, 1500);
	}
	if (kindOfOperation == "done") {
		setTimeout(() => {
			changeShowVisible();
		}, 2500);
	}

	return (
		<View>
			<Modal
				visible={showHideModal}
				animationType="fade"
				transparent={true}
			>
				<View style={styles.centeredView}>
					{kindOfOperation == "error" ? (
						<View style={styles.modalView}>
							<AntIcon
								name={"warning"}
								style={{ color: "red" }}
								size={55}
							/>
							<Text style={styles.modalText}>{message}</Text>
							<Pressable
								style={[styles.button, styles.buttonClose]}
								onPress={changeShowVisible}
							>
								<Text style={styles.textStyle}>Ok</Text>
							</Pressable>
						</View>
					) : (
						<View
							style={[styles.modalView, { justifyContent: "space-around" }]}
						>
							<Ionicons
								name={"checkmark-done-sharp"}
								style={{ color: "green" }}
								size={55}
							/>
							<Text style={styles.modalText}>{message}</Text>
						</View>
					)}
				</View>
			</Modal>
		</View>
	);
};

export default PopUpModal;

const styles = StyleSheet.create({
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
		width: 330,
		height: 270,
		justifyContent: "space-between",
	},
	button: {
		borderRadius: 10,
		paddingVertical: 15,
		paddingHorizontal: 45,
		elevation: 2,
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
		fontSize: 18,
		fontFamily: "MrtMed",
	},
});
