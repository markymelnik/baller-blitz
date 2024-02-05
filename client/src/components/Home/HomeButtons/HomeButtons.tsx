import { NavigateToLoginButton } from '../../buttons/nav/NavigateToLoginButton.tsx';
import { NavigateToSignupButton } from '../../buttons/nav/NavigateToSignupButton.tsx';
import './home-btns.scss';

export const HomeButtons = () => {
  return (
    <div className='home-btns'>
      <NavigateToLoginButton />
      <NavigateToSignupButton />
    </div>
  );
};
