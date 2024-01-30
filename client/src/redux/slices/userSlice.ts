import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { UserState, User } from "../../types.ts";

const initialState: UserState = {
	userDetails: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User | null>) => {
			state.userDetails = action.payload;
		}
	}
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;