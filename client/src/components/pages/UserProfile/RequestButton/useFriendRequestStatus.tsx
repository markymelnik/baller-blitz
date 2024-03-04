import { useQuery } from "react-query";

import { createBackendEndpointUrl } from "../../../../utils/createBackendEndpointUrl";

export const useFriendRequestStatus = (addresseeId: number, accessToken: string) => {
  return useQuery(['friendRequestStatus', addresseeId], async () => {
    const BACKEND_ENDPOINT = createBackendEndpointUrl(`/friends/status?addresseeId=${addresseeId}`)
    const response = await fetch(`${BACKEND_ENDPOINT}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
		if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();

	}, {
    staleTime: 5 * 60 * 1000,
    select: data => data.status,
  });
};