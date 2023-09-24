import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: false,
	value: {},
};

export const dealersSlice = createSlice({
	name: "dealersSlice",
	initialState,
	reducers: {
		changeDealerStatus: (state, action) => {
			state.status = action.payload;
		},
		addDealersItem: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { changeDealerStatus, addDealersItem } = dealersSlice.actions;
export default dealersSlice.reducer;
