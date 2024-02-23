import { NavigateToSignupButton } from '../../buttons/nav/signuplogin/NavigateToSignupButton.tsx';
import { NavigateToLoginButton } from '../../buttons/nav/signuplogin/NavigateToLoginButton.tsx';
import { useUnauthorizedRender } from '../../../hooks/auth/useUnauthorizedRender.ts';
import { NavToGamesBtn } from '../../buttons/nav/NavToFrontBtn.tsx';
import { useAuthorizedRender } from '../../../hooks/auth/useAuthorizedRender.ts';
import './home-page.scss';

export const HomePage = () => {
  const UnauthenticatedHome = useUnauthorizedRender(
    () => (
      <div className='home-unauth'>
        <h2 className='unauth-title'>Get started</h2>
        <ul className='unauth-btns'>
          <li>
            <NavigateToLoginButton />
          </li>
          <li>
            <NavigateToSignupButton />
          </li>
        </ul>
      </div>
    ),
    ['user', 'admin']
  );

  const AuthenticatedHome = useAuthorizedRender(
    () => (
      <div className='home-auth'>
        <NavToGamesBtn />
      </div>
    ),
    ['user', 'admin']
  );

  return (
    <div className='home-page'>
      <h1 className='home-welcome'>Ball Battle</h1>
      <UnauthenticatedHome />
      <AuthenticatedHome />

      <div className='home-bot'>
      </div>
    </div>
  );
};
