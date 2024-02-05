import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx";

export const NavigateToFrontButton = () => {
  return (
    <NavigateToButtonCreator

      toRoute={'/front'}
      buttonText={'Front'}
      className={'nav-to-front-btn'}
    />
  );
};