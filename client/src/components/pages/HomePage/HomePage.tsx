import { NavigateToSignupButton } from '../../buttons/nav/signuplogin/NavigateToSignupButton.tsx';
import { NavigateToLoginButton } from '../../buttons/nav/signuplogin/NavigateToLoginButton.tsx';
import { useUnauthorizedRender } from '../../../hooks/auth/useUnauthorizedRender.ts';
import { useAuthorizedRender } from '../../../hooks/auth/useAuthorizedRender.ts';
import { NavToFrontBtn } from '../../buttons/nav/NavToFrontBtn.tsx';
import './home-page.scss';
import { Content } from '../../../lib/Content.ts';
import { FriendsList } from '../../friends/FriendsList/FriendsList.tsx';
import { PendingFriendRequests } from '../../friends/hooks/PendingFriendRequests.tsx';

export const HomePage = () => {

  const UnauthenticatedLoginButton = useUnauthorizedRender(NavigateToLoginButton, ['user','admin']);
  const UnauthenticatedSignupButton = useUnauthorizedRender(NavigateToSignupButton, ['user','admin']);
  const AuthenticatedToFrontButton = useAuthorizedRender(NavToFrontBtn, ['user','admin']);
  
  return (
    <>
      <div className='home-page'>
        <div className='home-welcome'>{Content.home.intro}</div>
        <div className='home-center'>
          <UnauthenticatedLoginButton />
          <UnauthenticatedSignupButton />
          <AuthenticatedToFrontButton />
        </div>
        <div className='home-bot'></div>
      </div>
      <FriendsList />
      <PendingFriendRequests />
    </>
  );
};
