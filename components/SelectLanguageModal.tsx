import {
	Keyboard,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { modalBorderRadius } from "@/constants/data";
import { normalize } from "@/utils/normalizeFont";
import i18n from "@/i18n/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { pl, enUS } from "date-fns/locale";
import { setDefaultOptions } from "date-fns/setDefaultOptions";

const SelectLanguageModal = ({ visible, closeModal }: any) => {
	const [isVisible, setIsVisible] = useState(visible);
	const { t } = useTranslation();

	const changeLanguage = async (lng: string) => {
		i18n.changeLanguage(lng);
		await AsyncStorage.setItem("language", lng);
		closeModal();
	};


	return (
		<View>
			<Modal
				visible={isVisible}
				animationType="fade"
				transparent={true}
			>
				<TouchableWithoutFeedback
					onPress={closeModal}
					accessible={false}
				>
					<View style={styles.modalContenerBackground}>
						<View style={{ height: 360, width: "88%" }}>
							<ScrollView style={styles.modalView}>
								<TouchableHighlight
									underlayColor="#f0f0f0"
									onPress={() => {
										changeLanguage("pl");
										setDefaultOptions({ locale: pl });
									}}
								>
									<Text style={styles.modalText}>{t("languages.polish")}</Text>
								</TouchableHighlight>
								<TouchableHighlight
									underlayColor="#f0f0f0"
									onPress={() => {
										changeLanguage("enUS"), setDefaultOptions({ locale: enUS });
									}}
								>
									<Text style={styles.modalText}>{t("languages.english")}</Text>
								</TouchableHighlight>
								<TouchableHighlight underlayColor="#f0f0f0">
									<Text style={styles.modalText}>{t("languages.france")}</Text>
								</TouchableHighlight>
								<TouchableHighlight underlayColor="#f0f0f0">
									<Text style={styles.modalText}>{t("languages.german")}</Text>
								</TouchableHighlight>
							</ScrollView>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	);
};

export default SelectLanguageModal;

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
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		width: "88%",
	},
	modalText: {
		marginVertical: 20,
		textAlign: "center",
		fontSize: normalize(22),
		fontFamily: "MrtMed",
	},
});
