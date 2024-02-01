import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

import { AccessToken } from "../../types.ts";

const InitialTokenState: AccessToken = {
	accessToken: null,
}

const tokenSlice = createSlice({
	name: 'token',
	initialState: InitialTokenState,
	reducers: {
		setAccessToken: (state, action: PayloadAction<string>) => {
			state.accessToken = action.payload;
		}
	},
});

export const { setAccessToken } = tokenSlice.actions;
export default tokenSlice.reducer;