import { SignupCredentials } from '../types.ts';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;

export const signupUser = async (formData: SignupCredentials) => {
  try {
    const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Signup failed.');
    }

    const responseData = await response.json();
    console.log('Signup successful :)');
    return responseData;
  } catch (error) {
    console.error('Signup unsucessfult ):');
  }
};
