import { PiCaretLeft } from 'react-icons/pi';

import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx";


export const NavBackToFrontButton = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/front'}
      buttonText={'Games'}
      className={'nav-to-front-btn'}
    >
    <PiCaretLeft size={20} />
    </NavigateToButtonCreator>
  );
};