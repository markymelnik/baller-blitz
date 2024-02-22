import { useMutation } from "react-query"

export const useDeleteFriend = (accessToken: string, onSuccess: () => void) => {
	return useMutation( async (friendId: number) => {
		const response = await fetch(`http://localhost:4000/friends`, {
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