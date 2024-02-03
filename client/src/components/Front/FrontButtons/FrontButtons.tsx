import { NavigateToLoginButton } from '../../buttons/nav/NavigateToLoginButton.tsx';
import { NavigateToSignupButton } from '../../buttons/nav/NavigateToSignupButton.tsx';
import './front-btns.scss';

export const FrontButtons = () => {
  return (
    <div className='front-btns'>
      <NavigateToLoginButton />
      <NavigateToSignupButton />
    </div>
  );
};
