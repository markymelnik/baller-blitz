import { useMutation } from "react-query";

import { createBackendEndpointUrl } from "../../../../utils/createBackendEndpointUrl";

export const useAcceptFriendRequest = (accessToken: string) => {
  return useMutation( async (requestId: number) => {
    const BACKEND_ENDPOINT = createBackendEndpointUrl(`/friends/accept/${requestId}`);
    const response = await fetch(`${BACKEND_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
    }
  );
};