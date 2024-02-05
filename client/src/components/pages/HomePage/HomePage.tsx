import { HomeWelcome } from './HomeWelcome/HomeWelcome.tsx';
import { HomeButtons } from './HomeButtons/HomeButtons.tsx';
import './home-page.scss';

export const HomePage = () => {
  return (
    <div className='home-page'>
      <HomeWelcome />
      <HomeButtons />
    </div>
  );
};
