import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

const PopUpModal = ({isVisible}: any) => {
  const [showHideModal, setShowHideModal] = useState(isVisible)
	return (
		<View>
			<Modal
				visible={showHideModal}
				animationType='slide'
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>Hello World!</Text>
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={() => setShowHideModal(!showHideModal)}
						>
							<Text style={styles.textStyle}>Ok</Text>
						</Pressable>
					</View>
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
		marginTop: 22,
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
	},
	button: {
		borderRadius: 20,
		padding: 10,
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
	},
});
