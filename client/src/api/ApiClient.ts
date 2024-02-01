import { LoginCredentials, SignupCredentials } from '../types/authTypes.ts';
import { createBackendEndpointUrl } from '../utils/createBackendEndpointUrl.ts';

export const ApiClient = {
  async signup(path: string, formData: SignupCredentials) {
    const BACKEND_ENDPOINT_URL = createBackendEndpointUrl(path);

    try {
      const response = await fetch(BACKEND_ENDPOINT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Signup failed.');
      }

      return response.json();
    } catch (error) {
      console.error('Signup unsucessfult ):');
    }
  },

  async login(path: string, formData: LoginCredentials) {
    const BACKEND_ENDPOINT_URL = createBackendEndpointUrl(path);

    try {
      const response = await fetch(BACKEND_ENDPOINT_URL, {
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

      return response.json();
    } catch (error) {
      console.error('Login unsuccessful :(');
    }
  },

  async logout(path: string) {
    try {
      const BACKEND_ENDPOINT_URL = createBackendEndpointUrl(path);

      const response = await fetch(BACKEND_ENDPOINT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      console.log('Logout successful :)');
    } catch (error) {
      console.error('Logout failed', error);
    }
  },

  async retireveAccessToken(path: string) {
    try {
      const BACKEND_ENDPOINT_URL = createBackendEndpointUrl(path);

      const response = await fetch(BACKEND_ENDPOINT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error('The server did not refresh the access token');
      }

      return response.json();
    } catch (error) {
      console.error('Error during access token refresh', error);
      throw error;
    }
  },
};
