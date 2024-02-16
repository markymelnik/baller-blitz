import { Icons } from "../../../lib/Icons";

import { NavigateToButtonCreator } from "./NavigateToButtonCreator";

export const NavToProfileFromSettingsButton = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/profile'}
      /* buttonText={'Profile'} */
      className={'nav-to-profile-from-settings-btn'}
    >
    <Icons.ArrowLeft size={20} />
    </NavigateToButtonCreator>
  );
};