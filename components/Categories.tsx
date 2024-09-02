import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import colorConventer from "@/utils/colorConventer";
import { useRouter } from "expo-router";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { greenValuColor, incomeColor, redValueColor } from "@/constants/Colors";
import { useAppSelector } from "@/store/store";
import { normalize } from "@/utils/normalizeFont";
import { useTranslation } from "react-i18next";

export interface HomeScreenProps {
	navigation: NativeStackScreenProps<any, any>;
	category: any;
}

const Categories = ({ category }: any) => {
	const { t } = useTranslation();
	const [icon, setIcon] = useState();
	const [color, setColor] = useState<string>("");
	const incomeExpense = useAppSelector<string>(
		state => state.manageData.isSelected
	);

	const router = useRouter();

	useEffect(() => {
		category.data.map((item: any) => setIcon(item.icon));
		category.data.map((item: any) => setColor(item.color));
	}, [category]);

	const rgba = colorConventer(color, 0.15);

	const sum = category.data.reduce((acc: number, item: any) => {
		return acc + parseFloat(item.value);
	}, 0);
	
	return (
		<TouchableOpacity
			onPress={() =>
				router.push({
					pathname: "../detail",
					params: {
						category: category.name,
						color: color,
						icon: icon,
						isSelected: incomeExpense,
					},
				})
			}
			style={[styles.contener, { borderColor: color, backgroundColor: rgba }]}
		>
			<View style={{ flexGrow: 1 }}>
				<Image
					style={{ width: 28, height: 28 }}
					source={icon}
				/>
			</View>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					flexGrow: 100,
					width: "90%",
				}}
			>
				<View
					style={{
						flexShrink: 2,
						alignContent: "flex-start",
					}}
				>
					<Text style={{ fontSize: normalize(15), fontFamily: "MrtMed" }}>
						{category.name}
					</Text>
					<Text style={{ fontFamily: "Mrt" }}>
						{t("screens.home.categories.text.transaction")}{" "}
						{category.data.length}
					</Text>
				</View>
				<View style={{ flexShrink: 1 }}>
					{incomeExpense == "expenses" ? (
						<Text style={[styles.amount, { color: redValueColor }]}>
							- {sum.toFixed(2)} {t("screens.home.categories.text.currency")}
						</Text>
					) : (
						<Text style={[styles.amount, { color: greenValuColor }]}>
							{sum.toFixed(2)} {t("screens.home.categories.text.currency")}
						</Text>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Categories;

const styles = StyleSheet.create({
	contener: {
		height: 70,
		marginVertical: 5,
		borderRadius: 10,
		borderWidth: 0.6,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 18,
		gap: 10,
	},
	amount: {
		fontSize: normalize(16),
		fontFamily: "MrtMed",
	},
});
