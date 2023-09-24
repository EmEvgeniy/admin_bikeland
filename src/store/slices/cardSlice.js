import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: {},
	status: false,
};

export const cardSlice = createSlice({
	name: "cardSlice",
	initialState,
	reducers: {
		getCardValue: (state, action) => {
			state.value = action.payload;
		},
		changeCardStatus: (state, action) => {
			state.status = action.payload;
		},
	},
});

export const { getCardValue, changeCardStatus } = cardSlice.actions;
export default cardSlice.reducer;
