import { Icons } from '../../../lib/Icons';

import { NavigateToButtonCreator } from './NavigateToButtonCreator';

export const NavToSearchBtn = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/search'}
      buttonText={'Friends'}
      className={'nav-to-search-btn'}
    >
      <Icons.UserPlus size={27} />
    </NavigateToButtonCreator>
  );
};
