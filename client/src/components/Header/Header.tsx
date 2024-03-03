import { useLocation } from 'react-router-dom';

import { Content } from '../../lib/Content.ts';
import { useAuthorizedRender } from '../../hooks/auth/useAuthorizedRender.ts';
import { NavToProfileBtn } from '../buttons/nav/NavToProfileBtn.tsx';
import { NavToSearchBtn } from '../buttons/nav/NavToSearchBtn.tsx';
import { NavToSettingsBtn } from '../buttons/nav/NavToSettingsBtn.tsx';
import { NavToGamesBtn } from '../buttons/nav/NavToGamesBtn.tsx';
import { NavToNotifBtn } from '../buttons/nav/NavToNotifBtn.tsx';
import { NavToFriendsBtn } from '../buttons/nav/NavToFriendsBtn.tsx';
import { NavBackBtn } from '../buttons/nav/NavBackBtn.tsx';
import useHeaderHideOnScroll from '../../hooks/page/useHeaderHideOnScroll.ts';
import { useUnauthorizedRender } from '../../hooks/auth/useUnauthorizedRender.ts';

import Logo from './Logo/Logo.tsx';
import './header.scss';

export const Header = () => {
  const location = useLocation();
  useHeaderHideOnScroll();

	const AuthenticatedToProfileButton = useAuthorizedRender(NavToProfileBtn, ['user','admin']);
  const AuthenticatedToSearchButton = useAuthorizedRender(NavToSearchBtn, ['user','admin']);
  const AuthenticatedToSettingsButton = useAuthorizedRender(NavToSettingsBtn, ['user','admin']);
  const AuthenticatedToFriendsButton = useAuthorizedRender(NavToFriendsBtn, ['user','admin']);
  const AuthenticatedBackBtn = useAuthorizedRender(NavBackBtn, ['user','admin']);
  const AuthenticatedToGamesBtn = useAuthorizedRender(NavToGamesBtn, ['user','admin'])
  const UnauthenticatedBackBtn = useUnauthorizedRender(NavBackBtn, ['user','admin']);
  const AuthenticatedToNotifBtn = useAuthorizedRender(NavToNotifBtn, ['user','admin']);
	
  const UnauthenticatedHeader = useUnauthorizedRender(
    () => (<div className='header-top'>
    {location.pathname === '/' && <Logo />}
    {location.pathname === '/signup' && <Logo />}
    {location.pathname === '/login' && <Logo />}
  </div>),  ['user','admin']
  ) 

  const AuthenticatedHeader = useAuthorizedRender(
    () => (<div className='header-bot'>
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
    </div>

    <nav className='header-right-nav'>
      {location.pathname === '/' && <AuthenticatedToProfileButton />}
      {location.pathname === '/' && <AuthenticatedToSearchButton />}
      {location.pathname === '/games' && <AuthenticatedToProfileButton />}
      {location.pathname === '/games' && <AuthenticatedToSearchButton />}
      {location.pathname === '/profile' && (<AuthenticatedToFriendsButton />)}
      {location.pathname === '/profile' && <AuthenticatedToNotifBtn />}
      {location.pathname === '/profile' && (<AuthenticatedToSettingsButton />)}
      {location.pathname.startsWith('/profile') &&
        location.pathname !== '/profile' && (
          <AuthenticatedToProfileButton />
        )}
      {location.pathname === '/search' && <AuthenticatedToProfileButton />}
      {location.pathname === '/friends' && <AuthenticatedToSearchButton />}
    </nav>
  </div>),  ['user','admin']
  ) 



  return (
    <header className='header-container'>
      <UnauthenticatedHeader />
      <AuthenticatedHeader />
    </header>
  );
};
