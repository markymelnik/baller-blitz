import { NavigateToSignupButton } from '../../buttons/nav/signuplogin/NavigateToSignupButton.tsx';
import { NavigateToLoginButton } from '../../buttons/nav/signuplogin/NavigateToLoginButton.tsx';
import { useUnauthorizedRender } from '../../../hooks/auth/useUnauthorizedRender.ts';
import { NavToGamesBtn } from '../../buttons/nav/NavToGamesBtn.tsx';
import { useAuthorizedRender } from '../../../hooks/auth/useAuthorizedRender.ts';
import './home-page.scss';

export const HomePage = () => {
  const UnauthenticatedHome = useUnauthorizedRender(
    () => (
      <nav className='home-unauth'>
        <h2 className='unauth-title'>Get started</h2>
        <ul className='unauth-btns'>
          <li>
            <NavigateToLoginButton />
          </li>
          <li>
            <NavigateToSignupButton />
          </li>
        </ul>
      </nav>
    ),
    ['user', 'admin']
  );

  const AuthenticatedHome = useAuthorizedRender(
    () => (
      <nav className='home-auth'>
        <NavToGamesBtn />
      </nav>
    ),
    ['user', 'admin']
  );

  return (
    <main className='home-page'>
      <h1 className='home-welcome'>
        Ball <br /> Battle.
      </h1>
      <UnauthenticatedHome />
      <AuthenticatedHome />
      <div className='home-bot'></div>
    </main>
  );
};
