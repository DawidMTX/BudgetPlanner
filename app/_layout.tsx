import { SelectCategory } from "@/contexts/SelectCategory";
import { TemporaryDataContext } from "@/contexts/TemporaryData";
import { Providers } from "@/store/provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import "@/i18n/i18n";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [category, setCategory] = useState<string>("");
	const [temporaryData, setTemporaryData] = useState<any>("");
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
		MrtBold: require("../assets/fonts/Montserrat-Bold.ttf"),
		MrtMed: require("../assets/fonts/Montserrat-Medium.ttf"),
		Mrt: require("../assets/fonts/Montserrat-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<SelectCategory.Provider value={{ category, setCategory }}>
			<TemporaryDataContext.Provider
				value={{ temporaryData, setTemporaryData }}
			>
				<Providers >
					<Stack>
						<Stack.Screen
							name="(tabs)"
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="detail"
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen name="+not-found" />
					</Stack>
					<StatusBar style="dark" />
				</Providers>
			</TemporaryDataContext.Provider>
		</SelectCategory.Provider>
	);
}
