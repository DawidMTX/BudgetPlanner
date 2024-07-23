const validateAmount = (amount: any) => {
	let cost;
	let dot;
	let amountConvertedToString = amount.toString();

	if (amountConvertedToString.includes(",")) {
		dot = amountConvertedToString.indexOf(",");
		amountConvertedToString = amountConvertedToString.replace(",", ".");
	} else if (amountConvertedToString.includes(".")) {
		dot = amountConvertedToString.indexOf(".");
	}

	
	if (dot > 0) {
		return (cost = amountConvertedToString.slice(0, dot + 3));
	} else cost = amountConvertedToString;

	return cost;
};

export default validateAmount;