// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export function TabBarIcon({
	style,
	...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) {
	return (
		<Ionicons
			size={28}
			style={[{ marginBottom: -3 }, style]}
			{...rest}
		/>
	);
}

export function AntIcon({
	style,
	...rest
}: IconProps<ComponentProps<typeof AntDesign>["name"]>) {
	return (
		<AntDesign
			size={28}
			style={[{ marginBottom: -3 }, style]}
			{...rest}
		/>
	);
}

export function MaterialIcon({
	style,
	...rest
}: IconProps<ComponentProps<typeof MaterialIcons>["name"]>) {
	return (
		<MaterialIcons
			size={28}
			style={[{ marginBottom: -3 }, style]}
			{...rest}
		/>
	);
}

export function FontAwsomeIcon({
	style,
	...rest
}: IconProps<ComponentProps<typeof FontAwesome>["name"]>) {
	return (
		<FontAwesome
			size={28}
			style={[{ marginBottom: -3 }, style]}
			{...rest}
		/>
	);
}
