import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { UserState, UserDetails } from "../../types/userTypes.ts";

const initialState: UserState = {
	userDetails: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		setUserDetails: (state, action: PayloadAction<UserDetails | null>) => {
			state.userDetails = action.payload;
		},
		clearUserDetails: (state) => {
			state.userDetails = null;
		},
	}
})

export const { setUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;