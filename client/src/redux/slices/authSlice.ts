import { createSlice } from '@reduxjs/toolkit';

import { AuthState } from '../../types/authTypes.ts';

const initialState: AuthState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    authenticateUser: (state) => {
      state.isLoggedIn = true;
    },
    unauthenticateUser: (state) => {
      state.isLoggedIn = false;
    }
  },
});

export const { authenticateUser, unauthenticateUser } = authSlice.actions;
export default authSlice.reducer;
