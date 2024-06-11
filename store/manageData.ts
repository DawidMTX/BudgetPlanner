import { TypeOfState } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import moment from "moment";


const initialState: TypeOfState = {
	month: ''
};

const manageData = createSlice({
	name: "ManageData",
	initialState,
	reducers: {
		selectedMonth(state, action: PayloadAction<any>) {
			state.month = action.payload;
		},
		
	},
});

export const { selectedMonth} = manageData.actions;
export default manageData.reducer;