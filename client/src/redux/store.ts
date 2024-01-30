import { configureStore } from '@reduxjs/toolkit';

import { AuthState, UserState } from '../types.ts';

import authReducer from './slices/authSlice.ts';
import userReducer from './slices/userSlice.ts';

export type RootState = {
  auth: AuthState,
  user: UserState,
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
