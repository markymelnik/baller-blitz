import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

export const useWebSocket = (accessToken: string) => {
  const [emailVerified, setIsVerified] = useState<boolean>(false);

  useEffect(() => {
		const channel = new BroadcastChannel('email_verification_channel');
    let socket = null;

    if (accessToken) {
      socket = socketIOClient('http://localhost:4000', {
        query: {
          token: accessToken,
        },
      });

      socket.on('connect', () => {
    
        socket.emit('emailVerified');

      });

      socket.on('navigate', (data) => {
    
        if (data.verified) {
      
          channel.postMessage({ emailVerified: true });
          if (data.verified === true) {
            socket.removeAllListeners('navigate');
            socket.close();
            console.log('WebSocket connection closed after verification');
          }
        }
      });
    }

		channel.onmessage = (event) => {
      if (event.data.emailVerified) {
        setIsVerified(true);
      }
    };

    return () => {
      console.log('WebSocket connection clean up');
      if (socket) {
        socket.removeAllListeners('navigate');
        socket.close();
      }
			channel.close();
    };
  }, [accessToken]);

  return { emailVerified };
};
