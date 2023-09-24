import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value:false
}

export const photoSlice = createSlice({
	name: "photoSlice",
	initialState,
	reducers:{
		changePhotoStatus: (state,action) => {
			state.value = action.payload
		}
	}
})

export const { changePhotoStatus} =photoSlice.actions
export default photoSlice.reducer