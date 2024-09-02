import getData from "./storageData";
import validateAmount from "./validateAmount";

const createNewItem = async (
	selectedItem: any,
	text: any,
	selectedDate: any,
	isSelected: any,
	amount: any,
	id: number
) => {
	const numberValue = await validateAmount(amount);
	if (selectedItem.title === undefined) {
		selectedItem = {
			title: "###",
			icon: require("@/assets/images/shopping-cart.png"),
			color: "#fff",
		};
	}
	let dataArray: any = [];
	try {
		let createdData: any = selectedItem;
		Object.assign(createdData, { name: text });
		Object.assign(createdData, { value: numberValue });
		Object.assign(createdData, { id: id });
		Object.assign(createdData, { date: selectedDate });
		Object.assign(createdData, { focused: false });

		if (
			createdData &&
			createdData.name.length > 0 &&
			createdData.value.length > 0
		) {
			const dataFromStorage = await getData(isSelected);
			console.log("Data: ", dataFromStorage);
			if (dataFromStorage === null) {
				dataArray.push(createdData);
			} else if (dataFromStorage.length > 0) {
				dataArray = [...dataFromStorage, createdData];
			}
			return dataArray;
		} else {
			return null;
		}
	} catch (error) {
		console.log("Error message: ", error);
		return null;
	}
};

export default createNewItem;
