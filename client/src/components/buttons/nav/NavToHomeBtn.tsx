import { NavigateToButtonCreator } from './NavigateToButtonCreator.tsx';
import './nav-to-btns.scss';

export const NavToHomeBtn = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/'}
      className={'nav-to-home-btn'}
    >
      Home
      </NavigateToButtonCreator>
  );
};
