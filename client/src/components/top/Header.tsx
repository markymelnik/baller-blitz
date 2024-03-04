import { useLocation } from 'react-router-dom';

import { Content } from '../../lib/Content.ts';
import { useAuthorizedRender } from '../../hooks/auth/useAuthorizedRender.ts';
import { NavToProfileBtn } from '../buttons/nav/NavToProfileBtn.tsx';
import { NavToSearchBtn } from '../buttons/nav/NavToSearchBtn.tsx';
/* import { NavToSettingsBtn } from '../buttons/nav/NavToSettingsBtn.tsx'; */
import { NavToGamesBtn } from '../buttons/nav/NavToGamesBtn.tsx';
import { NavToNotifBtn } from '../buttons/nav/NavToNotifBtn.tsx';
import { NavToFriendsBtn } from '../buttons/nav/NavToFriendsBtn.tsx';
import { NavBackBtn } from '../buttons/nav/NavBackBtn.tsx';
import useHeaderHideOnScroll from '../../hooks/page/useHeaderHideOnScroll.ts';
import { useUnauthorizedRender } from '../../hooks/auth/useUnauthorizedRender.ts';
import './header.scss';

const Header = () => {
  const location = useLocation();
  useHeaderHideOnScroll();

	const AuthenticatedToProfileButton = useAuthorizedRender(NavToProfileBtn, ['user','admin']);
  const AuthenticatedToSearchButton = useAuthorizedRender(NavToSearchBtn, ['user','admin']);
  /* const AuthenticatedToSettingsButton = useAuthorizedRender(NavToSettingsBtn, ['user','admin']); */
  const AuthenticatedToFriendsButton = useAuthorizedRender(NavToFriendsBtn, ['user','admin']);
  const AuthenticatedBackBtn = useAuthorizedRender(NavBackBtn, ['user','admin']);
  const AuthenticatedToGamesBtn = useAuthorizedRender(NavToGamesBtn, ['user','admin'])
  const UnauthenticatedBackBtn = useUnauthorizedRender(NavBackBtn, ['user','admin']);
  const AuthenticatedToNotifBtn = useAuthorizedRender(NavToNotifBtn, ['user','admin']);

  const UnauthenticatedHeader = useUnauthorizedRender(
    () => (
      <header className='header-container'>
        <nav className='header-left-nav'>
          {location.pathname === '/signup' && <UnauthenticatedBackBtn />}
          {location.pathname === '/login' && <UnauthenticatedBackBtn />}
        </nav>

        <div className='header-middle'>
        {location.pathname === '/signup' && (
          <h1 className='header-h1'>Ball Battle</h1>
        )}
        {location.pathname === '/login' && (
          <h1 className='header-h1'>Ball Battle</h1>
        )}
    
      </div>
      </header>
    ),
    ['user', 'admin']
  );

  const AuthenticatedHeader = useAuthorizedRender(
    () => (
    <header className='header-container'>
      <nav className='header-left-nav'>
        {location.pathname === '/' && <AuthenticatedToGamesBtn />}
        {location.pathname === '/games' && <AuthenticatedBackBtn />}
        {location.pathname.startsWith('/profile') && <AuthenticatedBackBtn />}
        {location.pathname === '/settings' && <AuthenticatedBackBtn />}
        {location.pathname === '/search' && <AuthenticatedBackBtn />}
        {location.pathname === '/friends' && <AuthenticatedBackBtn />}
        {location.pathname === '/notifications' && <AuthenticatedBackBtn />}
      </nav>

      <div className='header-middle'>
        {location.pathname === '/settings' && (
          <h1 className='header-h1'>{Content.settings.title}</h1>
        )}
        {location.pathname === '/games' && (
          <h1 className='header-h1'>{Content.games.title}</h1>
        )}
        {location.pathname === '/friends' && (
          <h1 className='header-h1'>{Content.friends.title}</h1>
        )}
        {location.pathname === '/search' && (
          <h1 className='header-h1'>{Content.search.title}</h1>
        )}
        {location.pathname === '/notifications' && (
          <h1 className='header-h1'>{Content.notifs.title}</h1>
        )}
        {location.pathname === '/profile' && (
          <h1 className='header-h1'>{Content.profile.title}</h1>
        )}
        {location.pathname.startsWith('/profile') &&
          location.pathname !== '/profile' && (
            <h1 className="header-h1">User</h1>
          )}
      </div>

      <nav className='header-right-nav'>
        {location.pathname === '/' && <AuthenticatedToProfileButton />}
        {location.pathname === '/' && <AuthenticatedToSearchButton />}
        {location.pathname === '/games' && <AuthenticatedToProfileButton />}
        {location.pathname === '/games' && <AuthenticatedToSearchButton />}
        {location.pathname === '/profile' && (<AuthenticatedToFriendsButton />)}
        {location.pathname === '/profile' && <AuthenticatedToNotifBtn />}
        {location.pathname.startsWith('/profile') &&
          location.pathname !== '/profile' && (
            <AuthenticatedToProfileButton />
          )}
        {location.pathname.startsWith('/profile') &&
          location.pathname !== '/profile' && (
            <AuthenticatedToSearchButton />
          )}
        {location.pathname === '/search' && <AuthenticatedToProfileButton />}
        {location.pathname === '/friends' && <AuthenticatedToSearchButton />}
      </nav>
    </header>
    ),  ['user','admin']
  ) 

  return (
    <>
    <UnauthenticatedHeader />
      <AuthenticatedHeader />
    </>
  );
};

export default Header;
