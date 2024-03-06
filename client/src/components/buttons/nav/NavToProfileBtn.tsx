import { useUserDetails } from '../../../hooks/stateSelectors.ts';

import { NavigateToButtonCreator } from './NavigateToButtonCreator.tsx';
import './nav-to-btns.scss';

export const NavToProfileBtn = () => {
  const userDetails = useUserDetails()!;
  const { username } = userDetails;

  const letter = username.slice(0,1).toUpperCase();

  return (
    <NavigateToButtonCreator
      toRoute={'/profile'}
      className={'nav-to-profile-btn'}>
        <div className="profile-btn-img">
        {letter}
        </div>
    </NavigateToButtonCreator>
  );
};
