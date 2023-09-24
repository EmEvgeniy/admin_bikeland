import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: false,
};

export const burgerSlice = createSlice({
	name: "burgerSlice",
	initialState,
	reducers: {
		changeBurgerStatus: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { changeBurgerStatus } = burgerSlice.actions;
export default burgerSlice.reducer;
