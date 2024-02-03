import { NavigateToButtonCreator } from './NavigateToButtonCreator.tsx';
import './nav-to-btns.scss';

export const NavigateToLoginButton = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/login'}
      buttonText={'Login'}
      className={'nav-to-login-btn'}
    />
  );
};
