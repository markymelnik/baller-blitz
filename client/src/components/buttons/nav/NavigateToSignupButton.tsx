import { NavigateToButtonCreator } from './NavigateToButtonCreator.tsx';
import './nav-to-btns.scss';

export const NavigateToSignupButton = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/signup'}
      buttonText={'Sign Up'}
      className={'nav-to-signup-btn'}
    />
  );
};
