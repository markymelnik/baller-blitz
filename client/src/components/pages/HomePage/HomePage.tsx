import { useState } from 'react';

import { NavigateToSignupButton } from '../../buttons/nav/signuplogin/NavigateToSignupButton.tsx';
import { NavigateToLoginButton } from '../../buttons/nav/signuplogin/NavigateToLoginButton.tsx';
import { useUnauthorizedRender } from '../../../hooks/auth/useUnauthorizedRender.ts';
import { useIsMobile } from '../../../hooks/page/useIsMobile.ts';
import { useAuthorizedRender } from '../../../hooks/auth/useAuthorizedRender.ts';
import { Content } from '../../../lib/Content.ts';
import { Icons } from '../../../lib/Icons.ts';
import { BallPlayer } from '../../../../assets/BallPlayer.tsx';

import { HomeSidebar } from './HomeSidebar/HomeSidebar.tsx';
import { Dashboard } from './Dashboard/Dashboard.tsx';
import './home-page.scss';
import { GamesTab } from './GamesTab/GamesTab.tsx';
import { HomeRightbar } from './HomeRightbar/HomeRightbar.tsx';
import { FriendsTab } from './FriendsTab/FriendsTab.tsx';

const HomePage = () => {
  const isMobile = useIsMobile();

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

  const [activeTab, setActiveTab] = useState<string>('dashboard');


  const AuthenticatedHome = useAuthorizedRender(
    () => (
      <main className='home-page main-page auth'>
        
        {!isMobile && <HomeSidebar activeTab={activeTab} setActiveTab={setActiveTab} />}
      
          {!isMobile && activeTab === 'dashboard' && <Dashboard />}
          {!isMobile && activeTab === 'games' && <GamesTab />}
          {!isMobile && activeTab === 'friends' && <FriendsTab />}
      

        {!isMobile && <HomeRightbar />}
    
        {isMobile && <Dashboard />}
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
