import { TypeOfState } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import moment from "moment";


const initialState: TypeOfState = {
	isSelected: "expenses"
};

const manageData = createSlice({
	name: "ManageData",
	initialState,
	reducers: {
		getCostInformation(state, action: PayloadAction<any>) {
			state.isSelected = action.payload;
		},
		
	},
});

export const { getCostInformation} = manageData.actions;
export default manageData.reducer;