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




//!!!!! - poprawic podawanie kwoty, dodaje tylko dwu cyforwe liczby
// - przenoszenie na strone glowna po wpisaniu wydatku ??
// - uzupenic kategorie w logo i color i zmienic wyglad


// - dodac wysylanie i odbieranie danych do asyncstorage
// - dodac edytowanie i usowanie danych w async sotrage
