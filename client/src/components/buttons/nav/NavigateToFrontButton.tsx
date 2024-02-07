import { IconArrowNarrowLeft } from "@tabler/icons-react";

import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx";

export const NavigateToFrontButton = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/front'}
      buttonText={'Games'}
      className={'nav-to-front-btn'}
    >
      <IconArrowNarrowLeft size={25} stroke={1.4} />
    </NavigateToButtonCreator>
  );
};