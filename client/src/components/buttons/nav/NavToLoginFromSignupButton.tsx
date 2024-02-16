import { Content } from '../../../lib/Content.ts';

import { NavigateToButtonCreator } from './NavigateToButtonCreator.tsx';

export const NavToLoginFromSignupButton = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/login'}
      buttonText={Content.auth.login.title}
      className={'to-login-from-signup-btn'}
    />
  );
};
