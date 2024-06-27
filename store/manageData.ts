import { TypeOfState } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";
import moment from "moment";

const initialState: TypeOfState = {
	isSelected: "expenses",
	allData: [],
	filteredData: []
};

const manageData = createSlice({
	name: "ManageData",
	initialState,
	reducers: {
		getCostInformation(state, action: PayloadAction<any>) {
			state.isSelected = action.payload;
		},
		getAllData(state, action: PayloadAction<any>) {
			state.allData = action.payload;
		},
		getFilteredDataByMonth(state, action: PayloadAction<any>) {
			state.filteredData = action.payload
		}
	},
});

export const {
	getCostInformation,
	getAllData,
	getFilteredDataByMonth,
} = manageData.actions;
export default manageData.reducer;
