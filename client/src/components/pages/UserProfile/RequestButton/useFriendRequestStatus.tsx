import { useQuery } from "react-query";

export const useFriendRequestStatus = (addresseeId: number, accessToken: string) => {
  return useQuery(['friendRequestStatus', addresseeId], async () => {
    const response = await fetch(`http://localhost:4000/friends/status?addresseeId=${addresseeId}`, {
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