import { useMutation } from "react-query";

import { createBackendEndpointUrl } from "../../../../utils/createBackendEndpointUrl"

export const useDeleteFriend = (accessToken: string, onSuccess: () => void) => {
	return useMutation( async (friendId: number) => {
		const BACKEND_ENDPOINT = createBackendEndpointUrl('/friends');
		const response = await fetch(`${BACKEND_ENDPOINT}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ friendId })
		})

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		return response.json();
	}, { onSuccess })
}