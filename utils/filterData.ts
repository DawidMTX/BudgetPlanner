import { format } from "date-fns";

const filterData = (filteredDataByMonth: any) => {
	let listOfCategory: any = [];
	//Filter by category
	if (filteredDataByMonth) {
		filteredDataByMonth.map((item: any, i: number) => {
			if (listOfCategory.includes(item["title"])) {
				return;
			} else {
				listOfCategory.push(item["title"]);
			}
		});
	}

	//Data filtered by category
	let collectionArray: any = [];
	if (listOfCategory) {
		for (let i = 0; i < listOfCategory.length; i++) {
			let temporaryArray: any = [];
			filteredDataByMonth.map((item: any) => {
				if (item["title"].includes(listOfCategory[i])) {
					temporaryArray.push(item);
				}
			});
			collectionArray.push({
				name: `${listOfCategory[i]}`,
				data: temporaryArray,
			});
		}
	}
	return collectionArray;
};

export const filterByMonth = (allExpensesData:any, currentDate : any) => {
	let filteredDataByMonth: any = [];
	filteredDataByMonth = allExpensesData.filter((item: any) => {
		return format(item["date"], "MM-yyyy") == format(currentDate, "MM-yyyy");
	});
	return filteredDataByMonth;
}


export default filterData;
