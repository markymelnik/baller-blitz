import { IconBallBasketball } from "@tabler/icons-react";

import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx";

export const NavToFrontFromHomeButton = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/front'}
      buttonText={'Games'}
      className={'to-front-from-home-btn'}
    >
      <IconBallBasketball size={35} stroke={1} />
    </NavigateToButtonCreator>
  );
};