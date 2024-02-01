import { LoginCredentials } from '../types.ts';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;

export const loginUser = async (formData: LoginCredentials) => {

  try {
    const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include', // IMPORTANT
      mode: 'cors', // IMPORTANT
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const responseData = await response.json();
    console.log('Login successful :)');
    return responseData;
  } catch (error) {
    console.error('Login unsuccessful :(');
  }
};
