import DeleteAllDataModal from "@/components/DeleteAllDataModal";
import { normalize } from "@/utils/normalizeFont";
import { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	Modal,
	Pressable,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";

export default function HomeScreen() {
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

	const closeModal = () => {
		setShowDeleteModal(false);
	};
	// const deleteAll = async () => {};

	return (
		<SafeAreaView>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Ustawienia</Text>
			</View>
			{showDeleteModal && (
				<DeleteAllDataModal
					isVisible={showDeleteModal}
					closeModal={closeModal}
				/>
			)}
			<View style={styles.stepContainer}>
				<TouchableOpacity>
					<Text style={styles.button}>Język</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text style={styles.button}>Usuń reklamy</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text style={styles.button}>FeedBack</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setShowDeleteModal(true);
					}}
				>
					<Text style={styles.button}>Usuń wszystko</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text style={styles.button}>O aplikacji</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
	},
	title: {
		textTransform: "uppercase",
		fontSize: normalize(28),
		fontFamily: "MrtBold",
		marginTop: 20,
	},
	stepContainer: {
		height: "80%",
		marginBottom: 8,
		marginTop: 30,
		alignItems: "center",
		justifyContent: "space-around",
	},
	button: {
		fontFamily: "Mrt",
		fontSize: normalize(30),
	},
});
