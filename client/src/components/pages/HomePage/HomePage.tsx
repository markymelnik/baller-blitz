import { NavigateToSignupButton } from '../../buttons/nav/NavigateToSignupButton.tsx';
import { NavigateToLoginButton } from '../../buttons/nav/NavigateToLoginButton.tsx';
import { useUnauthorizedRender } from '../../../hooks/auth/useUnauthorizedRender.ts';
import { useAuthorizedRender } from '../../../hooks/auth/useAuthorizedRender.ts';
import { NavToFrontFromHomeButton } from '../../buttons/nav/NavToFrontFromHomeButton.tsx';
import './home-page.scss';
import { LogoutButton } from '../../buttons/LogoutButton/LogoutButton.tsx';
import { Content } from '../../../lib/Content.ts';

export const HomePage = () => {
  const UnauthenticatedLoginButton = useUnauthorizedRender(NavigateToLoginButton, ['user','admin']);
  const UnauthenticatedSignupButton = useUnauthorizedRender(NavigateToSignupButton, ['user','admin']);
  const AuthenticatedFrontButton = useAuthorizedRender(NavToFrontFromHomeButton, ['user','admin']);
  const AuthenticatedLogoutButton = useAuthorizedRender(LogoutButton, ['user','admin']);
  return (
    <div className='home-page'>
      <div className='home-welcome'>{Content.home.intro}</div>
      <div className='home-center'>
        <UnauthenticatedLoginButton />
        <UnauthenticatedSignupButton />
        <AuthenticatedFrontButton />
      </div>
      <div className='home-bot'>
        <AuthenticatedLogoutButton />
      </div>
    </div>
  );
};
