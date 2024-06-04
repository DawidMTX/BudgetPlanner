import Chart from "@/components/Chart";
import SelectMonth from "@/components/SelectMonth";

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
			<SelectMonth/>
			<Chart />
			<View></View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		
		
	},
});

