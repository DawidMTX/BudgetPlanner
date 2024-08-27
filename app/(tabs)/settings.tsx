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
				<DeleteAllDataModal isVisible={showDeleteModal}
				closeModal={closeModal}/>
				
			)}
			<View style={styles.stepContainer}>
				<TouchableOpacity>
					<Text style={styles.buttonTittle}>Język</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text>Usuń reklamy</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text>FeedBack</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setShowDeleteModal(true);
					}}
				>
					<Text>Usuń wszytko</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text>O aplikacji</Text>
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
		gap: 8,
		marginBottom: 8,
	},
	buttonTittle: {
		fontFamily: "Mrt",
	},
});
