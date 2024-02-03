import './nav-to-btns.scss';
import { NavigateToButtonCreator } from './NavigateToButtonCreator.tsx';

export const NavigateToProfileButton = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/profile'}
      buttonText={'Profile'}
      className={'nav-to-profile-btn'}
    />
  );
};
