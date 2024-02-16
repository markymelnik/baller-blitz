import { Content } from '../../../lib/Content.ts';

import { NavigateToButtonCreator } from './NavigateToButtonCreator.tsx';
import './nav-to-btns.scss';

export const NavigateToSignupButton = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/signup'}
      buttonText={Content.auth.signup.title}
      className={'nav-to-signup-btn'}
    />
  );
};
