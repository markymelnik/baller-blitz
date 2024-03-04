import { NavigateToSignupButton } from '../../buttons/nav/signuplogin/NavigateToSignupButton.tsx';
import { NavigateToLoginButton } from '../../buttons/nav/signuplogin/NavigateToLoginButton.tsx';
import { useUnauthorizedRender } from '../../../hooks/auth/useUnauthorizedRender.ts';
import { NavToGameBtnArrow } from '../../buttons/nav/NavToGamesBtnArrow.tsx';
import { useAuthorizedRender } from '../../../hooks/auth/useAuthorizedRender.ts';
import { Content } from '../../../lib/Content.ts';
import { useUserDetails } from '../../../hooks/stateSelectors.ts';

import { HomeGames } from './HomeGames/HomeGames.tsx';
import './home-page.scss';

const HomePage = () => {

  const userDetails = useUserDetails()!;

  const UnauthenticatedHome = useUnauthorizedRender(
    () => (
      <div className='home-unauth'>
        <div className="hu-left">
          <div className="hu-intro">Ball <br/> Battle</div>
        </div>
        <div className="hu-right">
          <div className="hu-initial-prompt">
          <h2 className='unauth-title'>{Content.home.prompt}</h2>
        <ul className='unauth-btns'>
          <li>
            <NavigateToLoginButton />
          </li>
          <li>
            <NavigateToSignupButton />
          </li>
        </ul>
          </div>
        
        </div>
      </div>
    ),
    ['user', 'admin']
  );

  const AuthenticatedHome = useAuthorizedRender(
    () => (
      <div className='home-auth'>
        <div className='home-welcome'>
          <div className="hw-hi">Hi {userDetails?.username}</div>
          <div className="hw-back">Welcome back!</div>
        </div>
        <HomeGames />
        <NavToGameBtnArrow />
      </div>
    ),
    ['user', 'admin']
  );

  return (
    <main className='home-page main-page'>
      <UnauthenticatedHome />
      <AuthenticatedHome />
    </main>
  );
};

export default HomePage;
