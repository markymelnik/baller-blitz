import { useMutation } from "react-query";

export const useRejectFriendRequest = (accessToken: string) => {
  return useMutation( async (requestId: number) => {
    const response = await fetch(`http://localhost:4000/friends/reject/${requestId}`, {
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