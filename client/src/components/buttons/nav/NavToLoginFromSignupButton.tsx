import { NavigateToButtonCreator } from './NavigateToButtonCreator.tsx';

export const NavToLoginFromSignupButton = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/login'}
      buttonText={'Login'}
      className={'to-login-from-signup-btn'}
    />
  );
};
