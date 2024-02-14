import { TbBallBasketball } from 'react-icons/tb';

import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx";

export const NavToFrontFromHomeButton = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/front'}
      buttonText={'Games'}
      className={'to-front-from-home-btn'}
    >
      <TbBallBasketball size={30} strokeWidth={1.2} />
    </NavigateToButtonCreator>
  );
};