import getData from "./storageData";

export const handleChangeAmount = (text: any) => {
	const numericValue = text
		.replace(/[^,.\d]/g, "")
		.replace(/^(\d*\.?)|(\d*)\.?/g, "$1$2");

	return numericValue;
};

export const changeNumberValue = (amount: any) => {
	let cost;
	let dot;
	let newAmount

	if(amount.includes(",")){
		dot = amount.indexOf(",");
		amount = amount.splice(dot, 1, ".");
	}
	else if (amount.includes(".")) {
		dot = amount.indexOf(".");
	}

	// if (amount.toString().includes(".")) {
	// 	dot = amount.toString().indexOf(".");
	// 	amount[dot]= ",";
	// } 

	if (dot > 0) {
		return (cost = amount.slice(0, dot + 3));
	} else cost = amount;

	return cost;
};

const createNewItem = async (
	selectedItem: any,
	text: any,
	selectedDate: any,
	isSelected: any,
	amount: any
) => {
	const numberValue = await changeNumberValue(amount);
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
