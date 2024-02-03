import { NavigateToButtonCreator } from './NavigateToButtonCreator.tsx';
import './nav-to-btns.scss';

export const NavigateToHomeButton = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/'}
      buttonText={'Home'}
      className={'nav-to-home-btn'}
    />
  );
};
