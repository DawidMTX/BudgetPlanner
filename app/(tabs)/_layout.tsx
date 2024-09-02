import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useTranslation } from "react-i18next";


export default function TabLayout() {
	const { t } = useTranslation();
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: t("screens.navigateMenu.home"),
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
					title: t("screens.navigateMenu.addNew"),
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "add-circle" : "add-circle-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: t("screens.navigateMenu.settings"),
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
