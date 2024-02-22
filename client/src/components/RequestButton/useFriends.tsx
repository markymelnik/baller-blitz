import { useQuery } from 'react-query';

export const useFriends = (accessToken: string) => {
  return useQuery(['friends'], async () => {
    const response = await fetch('http://localhost:4000/friends', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();

  });
};
