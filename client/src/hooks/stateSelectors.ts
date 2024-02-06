import { useSelector } from 'react-redux';

import { RootState } from '../redux/store.ts';
import { UserDetails } from '../types/userTypes.ts';
import { Game } from '../types/gameTypes.ts';

type Selector<S> = (state: RootState) => S;

const createStateSelectorHook = <S>(selector: Selector<S>) => {
  return () => useSelector(selector);
};

const selectIsAuthenticated = (state: RootState): boolean => state.auth.isLoggedIn;
const selectIsAuthLoading = (state: RootState): boolean => state.auth.isLoading;
const selectUserDetails = (state: RootState): UserDetails | null => state.user.userDetails;
const selectAccessToken = (state: RootState): string | null => state.token.accessToken;
const selectedLoading = (state: RootState): boolean => state.loading.isLoading;
const selectedGamesToday = (state: RootState): Game[] => state.gamesToday.games;

export const useAuth = createStateSelectorHook(selectIsAuthenticated);

export const useAuthLoading = createStateSelectorHook(selectIsAuthLoading);

export const useUserDetails = createStateSelectorHook(selectUserDetails);

export const useAccessToken = createStateSelectorHook(selectAccessToken);

export const useLoading = createStateSelectorHook(selectedLoading);

export const useGamesToday = createStateSelectorHook(selectedGamesToday);