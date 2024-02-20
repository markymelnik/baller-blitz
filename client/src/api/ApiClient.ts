import { AuthenticationError, TokenError } from '../errors/ErrorClasses.ts';
import { handleError } from '../errors/handleError.ts';
import { LoginCredentials, SignupCredentials } from '../types/authTypes.ts';
import { Prediction } from '../types/predictionTypes.ts';
import { createBackendEndpointUrl } from '../utils/createBackendEndpointUrl.ts';

export const ApiClient = {
  async processUserSignup(path: string, formData: SignupCredentials) {
    const BACKEND_ENDPOINT_URL = createBackendEndpointUrl(path);

    try {
      const response = await fetch(BACKEND_ENDPOINT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      return response.json();
    } catch (error) {
      const authenticationError = new AuthenticationError('Failed to signup');
      handleError(authenticationError);
    }
  },

  async processUserLogin(path: string, formData: LoginCredentials) {
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
      return response.json();
    } catch (error) {
      const authenticationError = new AuthenticationError('Failed to login');
      handleError(authenticationError);
    }
  },

  async processUserLogout(path: string) {
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

      return response.json();
    } catch (error) {
      const authenticationError = new AuthenticationError('Failed to logout');
      handleError(authenticationError);
    }
  },

  async checkIfEmailExists(email: string) {
    try {
      const BACKEND_ENDPOINT_URL = createBackendEndpointUrl('/check-email');
      const response = await fetch(BACKEND_ENDPOINT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      const authenticationError = new AuthenticationError('Failed to logout');
      handleError(authenticationError);
    }
  },

  async refreshAccessToken(path: string) {
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
      const data = await response.json();
      return data;
    } catch (error) {
      const tokenError = new TokenError('Failed to refresh access token');
      handleError(tokenError);
    }
  },

  async storePredictionInApi(
    path: string,
    accessToken: string,
    prediction: Prediction
  ) {
    try {
      const BACKEND_ENDPOINT_URL = createBackendEndpointUrl(path);
      const response = await fetch(BACKEND_ENDPOINT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(prediction),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      const networkError = new TokenError('Failed to make prediction');
      handleError(networkError);
    }
  },

  async updatePredictionInApi(
    path: string,
    accessToken: string,
    prediction: Prediction
  ) {
    try {
      const BACKEND_ENDPOINT_URL = createBackendEndpointUrl(path);
      const response = await fetch(BACKEND_ENDPOINT_URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(prediction),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      const networkError = new TokenError('Failed to make prediction');
      handleError(networkError);
    }
  },

  async fetchCurrentPredictionsFromApi(
    path: string,
    accessToken: string,
    gameIds: number[]
  ) {
    try {
      const gameIdsQueryString = gameIds.join(',');

      const BACKEND_ENDPOINT_URL = `${createBackendEndpointUrl(
        path
      )}?gameIds=${encodeURIComponent(gameIdsQueryString)}`;
      const response = await fetch(BACKEND_ENDPOINT_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      const networkError = new TokenError(
        'Failed to fetch current predictions'
      );
      handleError(networkError);
    }
  },

  async fetchUserStatsFromApi(path: string, accessToken: string) {
    try {
      const BACKEND_ENDPOINT_URL = createBackendEndpointUrl(path);

      const response = await fetch(BACKEND_ENDPOINT_URL, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      const networkError = new TokenError(
        'Failed to fetch current predictions'
      );
      handleError(networkError);
    }
  },

  async fetchAllPredictionsFromApi(path: string, accessToken: string) {
    try {
      const BACKEND_ENDPOINT_URL = createBackendEndpointUrl(path);
      const response = await fetch(BACKEND_ENDPOINT_URL, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      const networkError = new TokenError('Failed to fetch all predictions');
      handleError(networkError);
    }
  },

  async resendEmailVerification(path: string, accessToken: string) {
    try {
      const BACKEND_ENDPOINT_URL = createBackendEndpointUrl(path);
      const response = await fetch(BACKEND_ENDPOINT_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  },

  async updateUsername({
    newUsername,
    accessToken,
  }: {
    newUsername: string;
    accessToken: string;
  }) {
    const BACKEND_ENDPOINT_URL = createBackendEndpointUrl('/update-username');
    const response = await fetch(BACKEND_ENDPOINT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ username: newUsername }),
    });

    if (!response.ok) {
      throw new Error('Failed to update username');
    }

    return response.json();
  },

  async searchAllUsers(accessToken: string, query: string, page: number, pageSize: number) {
    const BACKEND_ENDPOINT_URL = createBackendEndpointUrl(`/users/search?query=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}`);
    const response = await fetch(BACKEND_ENDPOINT_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get users')
    }

    const data = await response.json();
    return data;
  },

  async fetchUserProfile(accessToken: string, username: string) {
    const BACKEND_ENDPOINT_URL = createBackendEndpointUrl(`/profile/${username}`);
    const response = await fetch(BACKEND_ENDPOINT_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get users')
    }

    const data = await response.json();
    return data;
  }
};
