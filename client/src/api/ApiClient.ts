import { AuthenticationError, NetworkError, TokenError } from '../errors/ErrorClasses.ts';
import { handleError } from '../errors/handleError.ts';
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

      /* if (!response.ok) {
        const networkError = new NetworkError(`Server did not return OK when signing up`, response.status);
        handleError(networkError);
      } */

      return response.json();
    } catch (error) {
      const authenticationError = new AuthenticationError('Failed to signup');
      handleError(authenticationError);
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

      /* if (!response.ok) {
        const networkError = new NetworkError(`Server did not return OK when logging in`, response.status);
        handleError(networkError);
      } */


      return response.json();
    } catch (error) {
      const authenticationError = new AuthenticationError('Failed to login');
      handleError(authenticationError);
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

      /* if (!response.ok) {
        const networkError = new NetworkError(`Server did not return OK when logging out`, response.status);
        handleError(networkError);
      } */

      return response.json();

    } catch (error) {
      const authenticationError = new AuthenticationError('Failed to logout');
      handleError(authenticationError);
    }
  },

  async retrieveAccessToken(path: string) {
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
        const networkError = new NetworkError(`Failed to refresh access token`, response.status);
        handleError(networkError);
      }

      return response.json();
    } catch (error) {
      const tokenError = new TokenError('Failed to refresh access token');
      handleError(tokenError);
    }
  },
};
