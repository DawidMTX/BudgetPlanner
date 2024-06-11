import { addDays, eachDayOfInterval, format, subDays } from "date-fns";
import { useEffect } from "react";

const currentDate = new Date();

const getDays = () => {
	const dateArr: object[] = [];
	const result = eachDayOfInterval({
		start: subDays(currentDate, 15),
		end: addDays(currentDate, 15),
	});
	result.map((item, index) => {
		let dateObj: any = new Object();
		dateObj.title = format(item, "dd MM yyyy");
		dateArr.push(dateObj);
	});

	return dateArr;
};

export default getDays;
