import { TypeOfState } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";
import moment from "moment";

const initialState: TypeOfState = {
	isSelected: "expenses",
	allIncomesData: [],
	allExpensesData: [],
	filteredData: [],
	bilans: 0
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
		getBilans(state, action: PayloadAction<any>) {
			state.bilans = action.payload
		}
	},
});

export const {
	getCostInformation,
	getAllExpensesData,
	getAllIncomesData,
	getFilteredDataByMonth,
	getBilans
} = manageData.actions;
export default manageData.reducer;
