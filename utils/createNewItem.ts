import getData from "./storageData";
import validateAmount from "./validateAmount";


const createNewItem = async (
	selectedItem: any,
	text: any,
	selectedDate: any,
	isSelected: any,
	amount: any
) => {
	const numberValue = await validateAmount(amount);
	let dataArray: any = [];
	try {
		let createdData: any = selectedItem;
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

			if (dataFromStorage.length > 0) {
				dataArray = [...dataFromStorage, createdData];
			} else {
				dataArray.push(createdData);
			}
			return dataArray;
		} else {
			return null;
		}
	} catch (error) {
		console.log("Error mesage: ", error);
		return null;
	}
};

export default createNewItem;
