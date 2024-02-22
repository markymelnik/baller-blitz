import { useQuery } from "react-query"

export const useIncomingFriendRequest = (accessToken: string) => {
	return useQuery(['incomingFriendRequests'], async () => {
		const response = await fetch('http://localhost:4000/friends/requests', {
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