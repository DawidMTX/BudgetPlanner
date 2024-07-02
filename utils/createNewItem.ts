
import getData from "./storageData";



const changeNumberValue = (amount: any) => {
	let cost;
	const dot = amount.toString().indexOf(",");
	if (dot > 0) {
		return (cost = amount.slice(0, dot + 3));
	} else cost = amount;

	return cost;
};

const createNewItem = async (
	selectedCategory: any,
	text: any,
	selectedDate: any,
	isSelected: any,
    amount: any
) => {
	const numberValue = await changeNumberValue(amount);
	let dataArray: any = [];
	try {
		let createdData: any = selectedCategory;
		Object.assign(createdData, { name: text });
		Object.assign(createdData, { value: numberValue });
		Object.assign(createdData, { id: Math.floor(Math.random() * 100) });
		Object.assign(createdData, { date: selectedDate });
		Object.assign(createdData, { focused: false });

		if (
			createdData &&
			createdData.name.length > 0 &&
			createdData.value.length > 0
		) {
			const dataFromStorage = await getData(isSelected);

			if (dataFromStorage) {
				dataArray = [...dataFromStorage, createdData];
			} else {
				dataArray.push(createdData);
			}
			return dataArray;
			// await AsyncStorage.setItem(isSelected, JSON.stringify(arr));
			// setShowErrorModal(false);
			// setShowSuccessModal(true);
			// clearItems();
		} else {
			return null;
			// setShowErrorModal(true);
			// setShowSuccessModal(false);
		}
	} catch (error) {
		// setShowErrorModal(true);
		// setShowSuccessModal(false);

		console.log("Error from addNew", error);
		return error;
	}
};

export default createNewItem;
