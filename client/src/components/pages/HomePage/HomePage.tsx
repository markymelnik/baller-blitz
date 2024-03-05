import { NavigateToSignupButton } from '../../buttons/nav/signuplogin/NavigateToSignupButton.tsx';
import { NavigateToLoginButton } from '../../buttons/nav/signuplogin/NavigateToLoginButton.tsx';
import { useUnauthorizedRender } from '../../../hooks/auth/useUnauthorizedRender.ts';
import { NavToGameBtnArrow } from '../../buttons/nav/NavToGamesBtnArrow.tsx';
import { useAuthorizedRender } from '../../../hooks/auth/useAuthorizedRender.ts';
import { Content } from '../../../lib/Content.ts';
import { Icons } from '../../../lib/Icons.ts';
import { useUserDetails } from '../../../hooks/stateSelectors.ts';
import { BallPlayer } from '../../../../assets/BallPlayer.tsx';

import { HomeGames } from './HomeGames/HomeGames.tsx';
import './home-page.scss';

const HomePage = () => {

  const userDetails = useUserDetails()!;

  const UnauthenticatedHome = useUnauthorizedRender(
    () => (
      <main className='home-page main-page unauth'>
        <div className='home-unauth'>
          <div className='hu-left'>
            <div className="hu-player">
            <BallPlayer />
            </div>
          
            <h1 className='hu-intro'>
              Baller<br /> Blitz
            </h1>
          </div>
          <div className='hu-right'>
            <div className='hu-right-top'>
              <div className="home-slogan">
                <h2 className="slogan-top">
                  Experience Basketball
                </h2>
                <div className="slogan-mid">
                  <h3>Stay up to date with games</h3>
                  <h3>Predict winners and track stats</h3>
                </div>
                
              </div>
            <div className='hu-initial-prompt'>
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
            <div className='hu-right-bot'>
              <Icons.Basketball strokeWidth={0.4}/>
            </div>
          </div>
        </div>
      </main>
    ),
    ['user', 'admin']
  );

  const AuthenticatedHome = useAuthorizedRender(
    () => (
      <main className='home-page main-page auth'>
      <div className='home-auth'>
        <div className='home-welcome'>
          <div className="hw-hi">Hi {userDetails?.username}</div>
          <div className="hw-back">Welcome back!</div>
        </div>
        <HomeGames />
        <NavToGameBtnArrow />
      </div>
      </main>
    ),
    ['user', 'admin']
  );

  return (
  <>
      <UnauthenticatedHome />
      <AuthenticatedHome />
  </>
  

  );
};

export default HomePage;
