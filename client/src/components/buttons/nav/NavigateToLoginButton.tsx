import { Content } from '../../../lib/Content.ts';

import { NavigateToButtonCreator } from './NavigateToButtonCreator.tsx';
import './nav-to-btns.scss';

export const NavigateToLoginButton = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/login'}
      buttonText={Content.auth.login.title}
      className={'nav-to-login-btn'}
    />
  );
};
