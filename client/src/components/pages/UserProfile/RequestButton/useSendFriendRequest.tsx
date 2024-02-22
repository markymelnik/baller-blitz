import { useMutation } from "react-query"

export const useSendFriendRequest = (accessToken: string) => {
  return useMutation( async (addresseeId: number) => {
    const response = await fetch('http://localhost:4000/friends/request', {
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