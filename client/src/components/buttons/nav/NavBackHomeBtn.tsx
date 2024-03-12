import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx";

export const NavBackHomeBtn = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/'}
      className={'nav-back-home-btn'}
      buttonText={'Home'}
    >
    </NavigateToButtonCreator>
  );
};