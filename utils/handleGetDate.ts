import {
	addDays,
	addMonths,
	eachDayOfInterval,
	format,
	subDays,
	subMonths,
} from "date-fns";
import { useEffect } from "react";
import { pl, se } from "date-fns/locale";

const getDays = (type: string, currentDay: Date) => {
	let newDay;
	console.log(currentDay);
	switch (type) {
		case "add":
			newDay = addDays(new Date(currentDay), 1);
			break;
		case "sub":
			newDay = subDays(currentDay, 1);
			break;
		default:
			newDay = format(new Date(), "dd MMMM yyyy", { locale: pl });
	}

	return newDay;
};

export const getMonths = (type: string, currentDay: Date) => {
	let newDay;
	console.log(currentDay);
	switch (type) {
		case "add":
			newDay = addMonths(new Date(currentDay), 1);
			break;
		case "sub":
			newDay = subMonths(new Date(currentDay), 1);
			break;
		default:
			newDay = format(new Date(), " MMMM yyyy", { locale: pl });
	}

	return newDay;
};

export default getDays;
