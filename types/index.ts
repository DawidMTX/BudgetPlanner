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

export interface PieChartTypes {
	value: number;
	color: string;
	gradientCenterColor: string;
	focused?: boolean;
	name?: string;
}

export interface TypeOfState {
	isSelected: string;
	// detailData: any;
	// allExpensesData: any;
	filteredData: any, 
	bilans: number,
	expense: number, 
	incomes: number,
}

export interface DropdownProps {
	entryData: CategoryTypes[] | object[];
	onSelect: (selectedItem: {}, index: number) => void;
	title: string;
	showChevronIcon: boolean;
	reset: boolean
}

export interface InputProps {
	name: string;
	style: { key: string; value: string } | any;
	onChangeText: (text: string) => void;
	value: string;
	placeholder: string;
	keyboardType?: string | any;
	maxLength: number
}

export interface SelectDateProps {
	defaultValue: Date | string,
	handleAddDay: () => void,
	handleSubDay: () => void,
	dateFormat: string,
	style: any
}

export interface CategoryTypes {
	title: string,
	icon: string,
	color: string,
}

export interface ParamsDate {
	date: string[] | string | undefined
	selected: string | string[]
}

export interface DataTypes extends CategoryTypes{
	name: string, 
	value: string,
	id: number,
	date: Date | string,
	focused: boolean
}

export interface DetailComponentTypes {
	singleCategoryData: DataTypes,
	key: number
	onEdit: (data: DataTypes) => void
	onDelete: () => void
}

export interface AddItemTypes {
	isVisible: boolean,
	selectedItem: DataTypes 
	closeModal: () => void, 
	isSelected: string, 
	date: Date | string, 
	typeOfOperation: string,
}
