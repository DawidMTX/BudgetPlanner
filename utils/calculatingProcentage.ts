 const calculatingProcentage = (value: number, sum: number) => {
    console.log(value)
	const percent = (value / sum) * 100;
	return percent.toFixed(1)
}

export default calculatingProcentage;