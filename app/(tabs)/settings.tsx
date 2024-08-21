import {
	Image,
	StyleSheet,
	Platform,
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
} from "react-native";

export default function HomeScreen() {
	return (
		<SafeAreaView>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Ustawienia</Text>
			</View>
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
				<TouchableOpacity>
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
		fontSize: 32,
  fontFamily: 'MrtBold'
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
  buttonTittle: {
    fontFamily: "Mrt"
  }

});
