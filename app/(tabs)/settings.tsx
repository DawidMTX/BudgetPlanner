import DeleteAllDataModal from "@/components/DeleteAllDataModal";
import SelectLanguageModal from "@/components/SelectLanguageModal";
import { normalize } from "@/utils/normalizeFont";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
} from "react-native";

export default function HomeScreen() {
	const { t } = useTranslation();
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false);

	const closeModal = () => {
		setShowDeleteModal(false);
	};
	const closeLanguageModal = () => {
		setShowLanguageModal(false);
	};
	// const deleteAll = async () => {};

	return (
		<SafeAreaView>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>{t("screens.settings.text.header")}</Text>
			</View>
			{showDeleteModal && (
				<DeleteAllDataModal
					isVisible={showDeleteModal}
					closeModal={closeModal}
				/>
			)}
			{showLanguageModal && (
				<SelectLanguageModal
					visible={showLanguageModal}
					closeModal={closeLanguageModal}
				/>
			)}
			<View style={styles.stepContainer}>
				<TouchableOpacity
					style={styles.tochableStyles}
					onPress={() => setShowLanguageModal(true)}
				>
					<Text style={styles.button}>
						{t("screens.settings.text.language")}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.tochableStyles}>
					<Text style={styles.button}>{t("screens.settings.text.ads")}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.tochableStyles}>
					<Text style={styles.button}>
						{t("screens.settings.text.feedback")}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.tochableStyles}
					onPress={() => {
						setShowDeleteModal(true);
					}}
				>
					<Text style={styles.button}>
						{t("screens.settings.text.deleteAll")}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text style={styles.button}>{t("screens.settings.text.about")}</Text>
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
	tochableStyles: {
		width: "100%",
		alignItems: "center",
	},
});
