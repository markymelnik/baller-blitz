import { BackendUser } from "./types.ts";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;

export const refreshToken = async () => {

  try {
    const response = await fetch(
      `${BACKEND_URL}:${BACKEND_PORT}/confirm-auth`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      }
    );

    if (!response.ok) {
      throw new Error('The server did not refresh the access token');
    }

		const newAccessTokenObject: BackendUser = await response.json();

    return newAccessTokenObject;
    
  } catch (error) {
    console.error('Error during access token refresh', error);
    throw error;
  }
};