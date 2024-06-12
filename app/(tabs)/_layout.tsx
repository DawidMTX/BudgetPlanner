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



//!!!!!! - sprawdzic czemu nie dziala dodawnie elementow do obiektu 
// - zrobic walidacje inputow - spawdzecznie podczas wysylania czy nie sa puste 
// - dodac mozliwosc zmieniania daty - chodzi o miesiace na stronie glowenj 
// - dodac sprawdzanie czy wszytkie elementy sa uzupenione i dopiero wtedy mozna wyslac obiekt z danymi
// - uzupenic kategorie w logo i color i zmienic wyglad
// - w addNew zostaly do poprawy kwota i kategoria 

// - dodac wysylanie i odbieranie danych do asyncstorage
// - dodac edytowanie i usowanie danych w async sotrage
