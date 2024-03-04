import { useQuery } from "react-query";

import { createBackendEndpointUrl } from "../../../../utils/createBackendEndpointUrl"

export const useIncomingFriendRequest = (accessToken: string) => {
	return useQuery(['incomingFriendRequests'], async () => {
		const BACKEND_ENDPOINT = createBackendEndpointUrl('/friends/requests');
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
	})
}