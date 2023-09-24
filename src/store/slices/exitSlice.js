import { createSlice  } from "@reduxjs/toolkit";


const initialState = {
	value: false
}

export const exitSlice = createSlice({
	name: "exitSlice",
	initialState,
	reducers: {
		setExitSlice: (state,action) => {
			state.value = action.payload
		}
	}
})

export const {setExitSlice} = exitSlice.actions
export default exitSlice.reducer