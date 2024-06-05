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
	active: string;
	isSelected?: string;
	style?: any;
	activeStyle?: any;
}

export interface ExpensesTypes {
	title: string;
	icon?: string;
	color?: string;
}

export interface PieChartTypes {
	value: number;
	color: string;
	gradientCenterColor: string;
	focused?: boolean;
	name?: string;
}

export interface TypeOfState {
	month: any
}