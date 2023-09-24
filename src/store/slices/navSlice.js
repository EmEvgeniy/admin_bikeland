import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: "Статистика по показам" 
}

export const navSlice = createSlice({
	name: "navSlice",
	initialState,
	reducers: {
		setNavItem: (state,action) => {
			state.value = action.payload
		}
	}
})

export const {setNavItem} = navSlice.actions
export default navSlice.reducer