import { useMutation } from "react-query"

export const useSendFriendRequest = (accessToken: string) => {
	
  return useMutation((addresseeId: number) => {
    fetch('http://localhost:4000/friends/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ addresseeId }),
      }).then((res) => res.json());
    }
  );
};