
 const chartFilterData = (filteredDataByMonth: any) => {
	//adds multiple values ​​and reduces the array with duplicate elements
	const pieData: any = [];
	let listOfCategory: any = [];

	filteredDataByMonth.map((item: any, i: number) => {
		if (listOfCategory.includes(item["title"])) {
			return;
		} else {
			listOfCategory.push(item["title"]);
		}
	});

	for (let i = 0; i < listOfCategory.length; i++) {
		let temporaryArray: any = [];
		filteredDataByMonth.map((item: any) => {
			if (item["title"].includes(listOfCategory[i])) {
				temporaryArray.push({
					value: parseFloat(item["value"]),
					color: item["color"].toLowerCase(),
					focused: false,
					name: item["title"],
				});
			}
		});
		pieData.push(temporaryArray);
	}
	let finalFilterData = [];
	for (let i = 0; i < pieData.length; i++) {
		let result = pieData[i].reduce((acc: any, obj: any) => {
			return acc + parseFloat(obj.value);
		}, 0);
		pieData[i][0].value = result;

		finalFilterData.push(pieData[i][0]);
	}
	// finalFilterData[0].focused = true;
	return finalFilterData;
};

export default chartFilterData;