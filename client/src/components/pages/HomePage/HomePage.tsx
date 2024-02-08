import { NavigateToSignupButton } from '../../buttons/nav/NavigateToSignupButton.tsx';
import { NavigateToLoginButton } from '../../buttons/nav/NavigateToLoginButton.tsx';
import { useUnauthorizedRender } from '../../../hooks/useUnauthorizedRender.ts';
import { NavigateToFrontButton } from '../../buttons/nav/NavigateToFrontButton.tsx';
import './home-page.scss';
import { useAuthorizedRender } from '../../../hooks/useAuthorizedRender.ts';

export const HomePage = () => {
  const UnauthenticatedLoginButton = useUnauthorizedRender(NavigateToLoginButton, ['user','admin']);
  const UnauthenticatedSignupButton = useUnauthorizedRender(NavigateToSignupButton, ['user','admin']);
  const AuthenticatedFrontButton = useAuthorizedRender(NavigateToFrontButton, ['user','admin']);

  return (
    <div className='home-page'>
      <div className='home-welcome'>Hello.</div>
      <div className='home-btns'>
        <UnauthenticatedLoginButton />
        <UnauthenticatedSignupButton />
        <AuthenticatedFrontButton />
      </div>
      <div className='home-bot'></div>
    </div>
  );
};
