export interface Data {
	name: string;
	series: number;
	sliceColor: string;
}

export interface typeOfExpense {
	title: string;
	icon: string;
}

export interface ActiveButtonProps {
	title: string;
	onPress: () => void;
	active: string
}
