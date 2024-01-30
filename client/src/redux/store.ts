import { configureStore } from '@reduxjs/toolkit';

import { AuthState } from '../types.ts';

import authReducer from './slices/authSlice.ts';

export type RootState = {
  auth: AuthState,
}

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
