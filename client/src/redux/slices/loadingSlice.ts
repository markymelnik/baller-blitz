import { createSlice } from "@reduxjs/toolkit";

import { LoadingState } from "../../types/authTypes.ts";

const initialState: LoadingState = {
	isLoading: false,
}

const loadingSlice = createSlice({
	name: 'loading',
	initialState: initialState,
	reducers: {
		startLoading: (state) => {
			state.isLoading = true;
		},
		stopLoading: (state) => {
			state.isLoading = false;
		}
	},
})

export const { startLoading, stopLoading } = loadingSlice.actions;
export default loadingSlice.reducer;