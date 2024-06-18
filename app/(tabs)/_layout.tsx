import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "home" : "home-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="addNew"
				options={{
					title: "Dodaj",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "add-circle" : "add-circle-outline"}
							color={color}
						/>
					),
				}}
			/>{" "}
			<Tabs.Screen
				name="settings"
				options={{
					title: "Ustawienia",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "settings" : "settings-outline"}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}





// - przenoszenie na strone glowna po wpisaniu wydatku ??
// - uzupenic kategorie w logo i color i zmienic wyglad
// - zerowanie input categori po wyslaniu parametrow 
// - dodac modal ktory sie pojawi po poprawnym dodaniu obiektu 


// - stworzyc komponenty do wyswietlania danych 
// - stworzyc cale zarzadzanie danymi - zmiany na wykresie, zmiene elemenow wyswietlanch
// - dodac edytowanie i usowanie danych w async sotrage



// - poprawic wszytkie typy typescript 
