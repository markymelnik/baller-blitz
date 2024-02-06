import { createSlice } from '@reduxjs/toolkit';

import { AuthState } from '../../types/authTypes.ts';

const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    authenticateUser: (state) => {
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    unauthenticateUser: (state) => {
      state.isLoggedIn = false;
      state.isLoading = false;
    },
  },
});

export const { startLoading, stopLoading, authenticateUser, unauthenticateUser } = authSlice.actions;
export default authSlice.reducer;
