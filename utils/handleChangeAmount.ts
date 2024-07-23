const handleChangeAmount = (text: any) => {
	let numericValue;
	if (text.includes(",")) {
		numericValue = text
			.replace(/[^,\d]/g, "")
			.replace(/^(\d*\,?)|(\d*)\,?/g, "$1$2");
	} else if (text.includes(".")) {
		numericValue = text
			.replace(/[^.\d]/g, "")
			.replace(/^(\d*\.?)|(\d*)\.?/g, "$1$2");
	}

	return numericValue;
};

export default handleChangeAmount;
