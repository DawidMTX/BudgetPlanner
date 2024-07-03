import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { format } from "date-fns";
import { incomeColor, redValueColor } from "@/constants/Colors";
import { useAppSelector } from "@/store/store";
import getData from "@/utils/storageData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddItemModal from "@/components/AddItemModal";

const DetailComponent = ({ singleCategoryData }: any) => {
	const [showEditModal, setShowEditModal] = useState(false);
	const incomeExpense = useAppSelector(state => state.manageData.isSelected);

	const deleteItem = async () => {
		try {
			const allData = await getData(incomeExpense);

			const filteredData = allData.filter((item: any) => {
				return (
					item.id !== singleCategoryData.id &&
					item.name !== singleCategoryData.name
				);
			});
			AsyncStorage.setItem(incomeExpense, JSON.stringify(filteredData));
		} catch (error) {}
	};

	// console.log(singleCategoryData)
	const closeModal = () => {
		setShowEditModal(false);
	};
	return (
		<View style={styles.contener}>
			{showEditModal && (
				<AddItemModal
					isVisible={showEditModal}
					closeModal={closeModal}
					selectedItem={singleCategoryData}
					isSelected={incomeExpense}
					date={singleCategoryData.date}
					typeOfOperation="edit"
				/>
			)}
			<View>
				<Text style={styles.nameText}>{singleCategoryData.name}</Text>
				<Text style={styles.dateText}>
					{format(singleCategoryData.date, "dd.MM.yyyy")}
				</Text>
			</View>
			<View>
				{incomeExpense == "expenses" ? (
					<Text style={{ fontSize: 22, color: redValueColor }}>
						{" "}
						- {singleCategoryData.value} zł
					</Text>
				) : (
					<Text style={{ fontSize: 22, color: incomeColor }}>
						{singleCategoryData.value} zł
					</Text>
				)}
			</View>
			<Button
				title="Usuń"
				onPress={deleteItem}
			/>
			<Button
				title="Edytuj"
				onPress={() => setShowEditModal(true)}
			/>
		</View>
	);
};

export default DetailComponent;

const styles = StyleSheet.create({
	contener: {
		borderWidth: 0.2,
		borderColor: "#ccc",
		height: 80,
		marginVertical: 1,
		backgroundColor: "#fff",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 20,
		alignItems: "center",
	},
	valueText: {
		fontSize: 30,
	},
	nameText: {
		fontSize: 28,
	},
	dateText: {
		fontSize: 17,
	},
});
