import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

import { AccessToken } from "../../types/authTypes.ts";

const InitialTokenState: AccessToken = {
	accessToken: null,
}

const tokenSlice = createSlice({
	name: 'token',
	initialState: InitialTokenState,
	reducers: {
		setAccessToken: (state, action: PayloadAction<string>) => {
			state.accessToken = action.payload;
		},
		clearAccessToken: (state) => {
			state.accessToken = null;
		}
	},
});

export const { setAccessToken, clearAccessToken } = tokenSlice.actions;
export default tokenSlice.reducer;