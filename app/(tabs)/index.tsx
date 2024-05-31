import Chart from "@/components/Chart";
import {
	Image,
	StyleSheet,
	Platform,
	View,
	SafeAreaView,
	Text,
} from "react-native";



export default function HomeScreen() {

	return (
		<SafeAreaView style={styles.container}>
			<Chart/>
			<View></View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
	},

});
