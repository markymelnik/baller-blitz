import { setAuthentication } from "../redux/slices/authSlice.ts";
import { setAccessToken } from "../redux/slices/tokenSlice.ts";
import { setUser } from "../redux/slices/userSlice.ts";
import { AppDispatch } from "../redux/store.ts";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;

export const logoutUser = async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // IMPORTANT
      mode: 'cors', // IMPORTANT
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    dispatch(setAccessToken(''));
    dispatch(setAuthentication(false));
		dispatch(setUser(null));

    console.log('Logout successful :)')
  } catch (error) {
    console.error('Logout failed', error);
  }
};
