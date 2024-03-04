import { useMutation } from "react-query";

import { createBackendEndpointUrl } from "../../../../utils/createBackendEndpointUrl";

export const useSendFriendRequest = (accessToken: string) => {
  return useMutation( async (addresseeId: number) => {
    const BACKEND_ENDPOINT = createBackendEndpointUrl(`/friends/request`);
    const response = await fetch(`${BACKEND_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ addresseeId }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      return response.json();
    }
  );
};