import { configureStore } from '@reduxjs/toolkit';

import { AccessToken, AuthState, UserState } from '../types.ts';

import authReducer from './slices/authSlice.ts';
import userReducer from './slices/userSlice.ts';
import tokenReducer from './slices/tokenSlice.ts';

export type RootState = {
  auth: AuthState,
  user: UserState,
  token: AccessToken,
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    token: tokenReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
