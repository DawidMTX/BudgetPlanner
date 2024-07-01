import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { AntIcon } from "./navigation/TabBarIcon";
import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation, useRouter } from "expo-router";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { StackNavigationState } from "@react-navigation/native";

const PopUpModal = ({ isVisible, changeShowVisible, kindOfOperation }: any) => {
	const [showHideModal, setShowHideModal] = useState(isVisible);
	
	

	if (kindOfOperation == "success") {
		setTimeout(() => {
			changeShowVisible();
			router.push("/(tabs)");
		}, 1500);
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
							<Text style={styles.modalText}>
								Prosze, uzupelnij wszystkie pola. 
							</Text>
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
							<Text style={styles.modalText}>Element dodany :D</Text>
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
		fontSize: 16,
	},
});
