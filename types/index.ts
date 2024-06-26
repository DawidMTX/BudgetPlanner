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
	isSelected: string;
	allExpensesData: any
}

export interface DropdownProps {
	entryData: ExpensesTypes[] | object[];
	onSelect: (selectedItem: {}, index: number) => void;
	title: string;
	showChevronIcon: boolean;
}

export interface InputProps {
	name: string;
	style: { key: string; value: string } | any;
	onChangeText: (text: string) => void;
	value: string;
	placeholder: string;
	keyboardType?: string | any;
}

export interface SelectDateProps {
	defaultValue: Date,
	handleAddDay: any,
	handleSubDay: any,
	dateFormat: string,
	style: any
}

export interface CategoryTypes {
	title: string,
	icon: string,
	color: string,
}

export interface AllDataTypes extends CategoryTypes {
	name: string;
	value: string;
	id: number;
	date: Date;
	focused: boolean;
}
