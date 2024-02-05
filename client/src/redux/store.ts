import { configureStore } from '@reduxjs/toolkit';

import { AccessToken, AuthState, LoadingState } from '../types/authTypes.ts';
import { UserState } from '../types/userTypes.ts';

import authReducer from './slices/authSlice.ts';
import userReducer from './slices/userSlice.ts';
import tokenReducer from './slices/tokenSlice.ts';
import loadingReducer from './slices/loadingSlice.ts';
import gamesTodayReducer, { GamesToday } from './slices/gamesTodaySlice.ts';

export type RootState = {
  auth: AuthState;
  user: UserState;
  token: AccessToken;
  loading: LoadingState;
  gamesToday: GamesToday;
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    token: tokenReducer,
    loading: loadingReducer,
    gamesToday: gamesTodayReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
