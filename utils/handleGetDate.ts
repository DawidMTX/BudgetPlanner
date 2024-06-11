import { addDays, eachDayOfInterval, format, subDays } from "date-fns";
import { useEffect } from "react";
import { pl, se } from "date-fns/locale";

const currentDate = new Date();

// const dateArr: object[] = [];
// 	const result = eachDayOfInterval({
// 		start: subDays(currentDate, 15),
// 		end: addDays(currentDate, 15),
// 	});
// 	result.map((item, index) => {
// 		let dateObj: any = new Object();
// 		dateObj.title = format(item, "dd MM yyyy");
// 		dateArr.push(dateObj);
// 	});

// 	return dateArr;

const getDays = (type: string, currentDay: Date) => {
	let newDay;
	console.log(currentDay)
	switch (type) {
		case "add":
			newDay = addDays(new Date(currentDay), 1);
			break;
		case "sub":
			newDay = subDays(currentDay, 1);
			break;
			default: newDay = format(new Date(), "dd MMMM yyyy", { locale: pl })
	}
	
	console.log("sas", newDay)
	return newDay;
	
};

export default getDays;
