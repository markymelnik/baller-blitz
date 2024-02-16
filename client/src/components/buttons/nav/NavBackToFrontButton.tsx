import { Icons } from '../../../lib/Icons.ts';

import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx";

export const NavBackToFrontButton = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/front'}
      buttonText={'Games'}
      className={'nav-to-front-btn'}
    >
    <Icons.ArrowLeft size={20} />
    </NavigateToButtonCreator>
  );
};