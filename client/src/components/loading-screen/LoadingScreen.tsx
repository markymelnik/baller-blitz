import { ring } from 'ldrs';

import './loading-screen.scss';
import { useAuthLoading } from '../../hooks/stateSelectors';

export const LoadingScreen = () => {
  ring.register();

  const isLoading = useAuthLoading();

  if (!isLoading) return null;

  return (
    <div className='loading-screen'>
      <l-ring
        size='50'
        stroke='3.5'
        bg-opacity='0'
        speed='2'
        color='white'
      ></l-ring>
    </div>
  );
};
