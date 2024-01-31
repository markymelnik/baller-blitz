const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;

export const logoutUser = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }
  } catch (error) {
    console.error('Logout failed', error);
  }
};
