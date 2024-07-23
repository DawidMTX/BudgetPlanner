import { format } from "date-fns";
 
 const filterByMonth = (allExpensesData: any, currentDate: any) => {
	let filteredDataByMonth: any = [];
	filteredDataByMonth = allExpensesData.filter((item: any) => {
		return format(item["date"], "MM-yyyy") == format(currentDate, "MM-yyyy");
	});
	return filteredDataByMonth;
};

export default filterByMonth;