import AsyncStorage from "@react-native-async-storage/async-storage";

const deleteAllData = async () => {
	const keys: string[] = ["incomes", "expenses"];
	try {
		await AsyncStorage.multiRemove(keys);
	} catch (e) {
		console.log("Error: ", e);
		return "error";
	}

	console.log("Done.");
	return "done";
};

export default deleteAllData;
