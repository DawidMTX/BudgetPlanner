 const calculatingProcentage = (value: number, sum: number) => {
	const percent = (value / sum) * 100;
	return percent.toFixed(1)
}

export default calculatingProcentage;