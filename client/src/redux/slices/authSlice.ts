import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { AuthState, User } from '../../types.ts';

interface SignupPayload {
  user: User;
}

interface LoginPayload {
  user: User;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    signup: (state, action: PayloadAction<SignupPayload>) => {
      state.user = action.payload.user;
    },
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
