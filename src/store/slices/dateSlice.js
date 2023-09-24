import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: {},
	status: false,
};

export const dateSlice = createSlice({
	name: "dateSlice",
	initialState,
	reducers: {
		getDataValue: (state, action) => {
			state.value = action.payload;
		},
		changeDateStatus: (state, action) => {
			state.status = action.payload;
		},
	},
});

export const { getDataValue, changeDateStatus } = dateSlice.actions;
export default dateSlice.reducer;
