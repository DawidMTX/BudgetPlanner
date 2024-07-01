import { TypeOfState } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";
import moment from "moment";

const initialState: TypeOfState = {
	isSelected: "expenses",
	allIncomesData: [],
	allExpensesData: [],
	filteredData: [],
	bilans: 0,
	expense: 0, 
	incomes: 0,
};

const manageData = createSlice({
	name: "ManageData",
	initialState,
	reducers: {
		getCostInformation(state, action: PayloadAction<any>) {
			state.isSelected = action.payload;
		},
		getAllExpensesData(state, action: PayloadAction<any>) {
			state.allExpensesData = action.payload;
		},
		getAllIncomesData(state, action: PayloadAction<any>) {
			state.allIncomesData = action.payload;
		},
		getFilteredDataByMonth(state, action: PayloadAction<any>) {
			state.filteredData = action.payload
		},
		getSumariseValue(state, action: PayloadAction<any>) {
			state.incomes = action.payload.incomes;
			state.expense = action.payload.expense;
			state.bilans = action.payload.incomes - action.payload.expense;
		},
	},
});

export const {
	getCostInformation,
	getAllExpensesData,
	getAllIncomesData,
	getFilteredDataByMonth,
	getSumariseValue
} = manageData.actions;
export default manageData.reducer;
