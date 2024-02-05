import { ring } from 'ldrs';

import { useLoading } from '../hooks/stateSelectors.ts';

import './loading-screen.scss';

export const LoadingScreen = () => {
  ring.register();

  const isLoading = useLoading();

  if (!isLoading) return null;

  return (
    <div className='loading-screen'>
      <l-ring
        size='50'
        stroke='4'
        bg-opacity='0'
        speed='2'
        color='black'
      ></l-ring>
    </div>
  );
};
