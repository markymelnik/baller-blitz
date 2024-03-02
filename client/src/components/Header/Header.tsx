import { useLocation } from 'react-router-dom';

import { Content } from '../../lib/Content.ts';
import { useAuthorizedRender } from '../../hooks/auth/useAuthorizedRender.ts';
import { NavToProfileBtn } from '../buttons/nav/NavToProfileBtn.tsx';
import { NavToSettingsBtn } from '../buttons/nav/NavToSettingsBtn.tsx';
import { NavToSearchBtn } from '../buttons/nav/NavToSearchBtn.tsx';
import { NavToGamesBtn } from '../buttons/nav/NavToGamesBtn.tsx';
import { NavBackBtn } from '../buttons/nav/NavBackBtn.tsx';
import useHeaderHideOnScroll from '../../hooks/page/useHeaderHideOnScroll.ts';
import { useUnauthorizedRender } from '../../hooks/auth/useUnauthorizedRender.ts';
import { NavToNotifBtn } from '../buttons/nav/NavToNotifBtn.tsx';

import Logo from './Logo/Logo.tsx';
import './header.scss';

const Header = () => {
  const location = useLocation();

  useHeaderHideOnScroll();

	const AuthenticatedToProfileButton = useAuthorizedRender(NavToProfileBtn, ['user','admin']);
  const AuthenticatedToSettingsButton = useAuthorizedRender(NavToSettingsBtn, ['user','admin']);
  const AuthenticatedToSearchButton = useAuthorizedRender(NavToSearchBtn, ['user','admin']);
  const AuthenticatedBackBtn = useAuthorizedRender(NavBackBtn, ['user','admin']);
  const AuthenticatedToGamesBtn = useAuthorizedRender(NavToGamesBtn, ['user','admin'])
  const UnauthenticatedBackBtn = useUnauthorizedRender(NavBackBtn, ['user','admin']);
  const AuthenticatedToNotifBtn = useAuthorizedRender(NavToNotifBtn, ['user','admin']);
  const UnauthenticatedLogo = useUnauthorizedRender(Logo, ['user','admin']);
	
  return (
    <header className='header-container'>
      {/* <div className='header-top'>
        {location.pathname === '/' && <UnauthenticatedLogo />}
        {location.pathname === '/signup' && <UnauthenticatedLogo />}
        {location.pathname === '/login' && <UnauthenticatedLogo />}
      </div> */}
      <div className='header-bot'>
        <nav className='header-left-nav'>
          {location.pathname === '/' && <AuthenticatedToGamesBtn />}
          {location.pathname === '/signup' && <UnauthenticatedBackBtn />}
          {location.pathname === '/login' && <UnauthenticatedBackBtn />}
          {location.pathname === '/games' && <AuthenticatedBackBtn />}
          {location.pathname.startsWith('/profile') && <AuthenticatedBackBtn />}
          {location.pathname === '/settings' && <AuthenticatedBackBtn />}
          {location.pathname === '/search' && <AuthenticatedBackBtn />}
          {location.pathname === '/friends' && <AuthenticatedBackBtn />}
          {location.pathname === '/notifications' && <AuthenticatedBackBtn />}
        </nav>

        <div className='header-middle'>
          {location.pathname === '/settings' && (
            <h2 className='settings-page-header'>{Content.settings.title}</h2>
          )}
          {location.pathname === '/friends' && (
            <h2 className='friends-page-header'>{Content.friends.title}</h2>
          )}
          {location.pathname === '/search' && (
            <h2 className='search-page-header'>{Content.search.title}</h2>
          )}
          {location.pathname === '/notifications' && (
            <h2 className='notif-page-header'>{Content.notifs.title}</h2>
          )}
          {location.pathname === '/profile' && (
            <h2 className='notif-page-header'>{Content.profile.title}</h2>
          )}
        </div>

        <nav className='header-right-nav'>
          {location.pathname === '/' && <AuthenticatedToProfileButton />}
          {location.pathname === '/' && <AuthenticatedToSearchButton />}
          {location.pathname === '/games' && <AuthenticatedToProfileButton />}
          {location.pathname === '/games' && <AuthenticatedToSearchButton />}
          {location.pathname === '/profile' && <AuthenticatedToNotifBtn />}
          {location.pathname === '/profile' && (
            <AuthenticatedToSettingsButton />
          )}
          {location.pathname.startsWith('/profile') &&
            location.pathname !== '/profile' && (
              <AuthenticatedToProfileButton />
            )}
          {location.pathname.startsWith('/profile') && (
            <AuthenticatedToSearchButton />
          )}
          {location.pathname === '/search' && <AuthenticatedToProfileButton />}
          {location.pathname === '/friends' && <AuthenticatedToSearchButton />}
        </nav>
      </div>
    </header>
  );
};

export default Header;
