import { Icons } from "../../../lib/Icons";

import { NavigateToButtonCreator } from "./NavigateToButtonCreator";

export const NavToSearchFromProfileBtn = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/search'}
      /* buttonText={'Search'} */
      className={'nav-to-search-from-profile-btn'}
    >
      <Icons.ArrowLeft size={20} />
    </NavigateToButtonCreator>
  );
};