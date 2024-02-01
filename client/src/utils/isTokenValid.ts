export const isTokenValid = (token: string) => {
  if (!token || typeof token !== 'string') return false;

  const parts = token.split('.');
  if (parts.length !== 3) {
    console.error('Invalid token format');
    return false;
  }

  try {
    const decodedToken = JSON.parse(atob(parts[1]));
    const expiryTime = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    return expiryTime > currentTime;
  } 
  catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
};
