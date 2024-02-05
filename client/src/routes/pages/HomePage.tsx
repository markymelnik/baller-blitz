import { HomeWelcome } from '../../components/Home/HomeWelcome/HomeWelcome.tsx';
import { HomeButtons } from '../../components/Home/HomeButtons/HomeButtons.tsx';

export const HomePage = () => {

  return (
    <div className='home-page'>
      <HomeWelcome />
      <HomeButtons />
    </div>
  );
};
