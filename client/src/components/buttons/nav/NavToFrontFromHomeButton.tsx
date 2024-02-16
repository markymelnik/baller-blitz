import { Icons } from '../../../lib/Icons.ts';
import { Content } from '../../../lib/Content.ts';

import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx";

export const NavToFrontFromHomeButton = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/front'}
      buttonText={Content.front.games.title}
      className={'to-front-from-home-btn'}
    >
      <Icons.Basketball size={30} strokeWidth={1.2} />
    </NavigateToButtonCreator>
  );
};