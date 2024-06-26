import { TypeOfState } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import moment from "moment";


const initialState: TypeOfState = {
	isSelected: "expenses",
	allExpensesData: []
};

const manageData = createSlice({
	name: "ManageData",
	initialState,
	reducers: {
		getCostInformation(state, action: PayloadAction<any>) {
			state.isSelected = action.payload;
		},
		getAllExpensesData(state, action:PayloadAction<any>) {
			state.allExpensesData = action.payload;
		}
		
	},
});

export const { getCostInformation, getAllExpensesData} = manageData.actions;
export default manageData.reducer;