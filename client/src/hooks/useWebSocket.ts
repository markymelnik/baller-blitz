import { useEffect, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';

import { ENV } from '../env';

export const useWebSocket = (accessToken: string) => {
  const [emailVerified, setIsVerified] = useState<boolean>(false);

  useEffect(() => {
		const channel = new BroadcastChannel('email_verification_channel');
    let socket: Socket | null = null;

    if (accessToken) {
      socket = socketIOClient(ENV.BACKEND_URL, {
        query: {
          token: accessToken,
        },
      });

      socket.on('connect', () => {
        if (socket) {
          socket.emit('emailVerified');
        }
      });

      socket.on('navigate', (data) => {
    
        if (data.verified) {
          channel.postMessage({ emailVerified: true });
          if (data.verified === true) {
            if (socket) {
              socket.removeAllListeners('navigate');
              socket.close();
              /* console.log('WebSocket connection closed after verification'); */
            }
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
      /* console.log('WebSocket connection clean up'); */
      if (socket) {
        socket.removeAllListeners('navigate');
        socket.close();
      }
			channel.close();
    };
  }, [accessToken]);

  return { emailVerified };
};
