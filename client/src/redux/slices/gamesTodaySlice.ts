import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Game } from "../../types/gameTypes.ts";

export interface GamesToday {
	games: Game[];
}

const initialState: GamesToday = {
	games: [],
}

const gamesTodaySlice = createSlice({
	name: 'gamesToday',
	initialState: initialState,
	reducers: {
		setGamesToday: (state, action: PayloadAction<Game[]>) => {
			state.games = action.payload;
		}

	},
})

export const { setGamesToday } = gamesTodaySlice.actions;
export default gamesTodaySlice.reducer;