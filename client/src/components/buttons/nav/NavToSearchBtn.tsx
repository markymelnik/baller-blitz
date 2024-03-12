import { Icons } from '../../../lib/Icons';

import { NavigateToButtonCreator } from './NavigateToButtonCreator';

export const NavToSearchBtn = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/search'}
      className={'nav-to-search-btn'}
    >
      <Icons.Search className='icon'/>
    </NavigateToButtonCreator>
  );
};
