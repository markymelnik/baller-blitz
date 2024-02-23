import { ring } from 'ldrs';

import { useAuthLoading } from '../../hooks/stateSelectors';
import './loading-screen.scss';

export const LoadingScreen = () => {
  ring.register();

  const isLoading = useAuthLoading();

  if (!isLoading) return null;

  return (
    <div className='loading-screen'>
      <l-ring
        size='40'
        stroke='4'
        bg-opacity='0'
        speed='2'
        color='var(--spinner-color)'
      ></l-ring>
    </div>
  );
};
