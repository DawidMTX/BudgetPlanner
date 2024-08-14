const handleChangeAmount = (text: any) => {
	let numericValue;

	if (text.includes(",")) {
		if (text[0] == ",") {
			text = "0,";
		}
		numericValue = text
			.replace(/[^,\d]/g, "")
			.replace(/^(\d*\,?)|(\d*)\,?/g, "$1$2");
	} else if (text.includes(".")) {
		if (text[0] == ".") {
			text = "0.";
		}
		numericValue = text
			.replace(/[^.\d]/g, "")
			.replace(/^(\d*\.?)|(\d*)\.?/g, "$1$2");
	} else {
		return text.replace(/[^,\d]/g, "");
	}

	return numericValue;
};

export default handleChangeAmount;
