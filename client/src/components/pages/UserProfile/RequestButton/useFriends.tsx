import { useQuery } from 'react-query';

import { createBackendEndpointUrl } from '../../../../utils/createBackendEndpointUrl';

export const useFriends = (accessToken: string) => {
  return useQuery(['friends'], async () => {
    const BACKEND_ENDPOINT = createBackendEndpointUrl('/friends');
    const response = await fetch(`${BACKEND_ENDPOINT}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();

  });
};
