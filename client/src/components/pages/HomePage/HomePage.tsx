import { NavigateToSignupButton } from '../../buttons/nav/NavigateToSignupButton.tsx';
import { NavigateToLoginButton } from '../../buttons/nav/NavigateToLoginButton.tsx';

import './home-page.scss';

export const HomePage = () => {
  return (
    <div className='home-page'>
      <div className='home-welcome'>Hello.</div>
      <div className='home-btns'>
        <NavigateToLoginButton />
        <NavigateToSignupButton />
      </div>
      <div className="home-bot"></div>
    </div>
  );
};
