import { useLocation } from 'react-router-dom';

import { Content } from '../../lib/Content.ts';
import { useAuthorizedRender } from '../../hooks/auth/useAuthorizedRender.ts';
import { NavToProfileBtn } from '../buttons/nav/NavToProfileBtn.tsx';
import { NavToSettingsBtn } from '../buttons/nav/NavToSettingsBtn.tsx';
import { NavToSearchBtn } from '../buttons/nav/NavToSearchBtn.tsx';
import { NavBackBtn } from '../buttons/nav/NavBackBtn.tsx';
import useHeaderHideOnScroll from '../../hooks/page/useHeaderHideOnScroll.ts';
import { useUnauthorizedRender } from '../../hooks/auth/useUnauthorizedRender.ts';
import { NavToNotifBtn } from '../buttons/nav/NavToNotifBtn.tsx';
import './header.scss';
import Logo from '../pages/HomePage/Logo/Logo.tsx';

const Header = () => {
  const location = useLocation();

  useHeaderHideOnScroll();

	const AuthenticatedToProfileButton = useAuthorizedRender(NavToProfileBtn, ['user','admin']);
  const AuthenticatedToSettingsButton = useAuthorizedRender(NavToSettingsBtn, ['user','admin']);
  const AuthenticatedToSearchButton = useAuthorizedRender(NavToSearchBtn, ['user','admin']);
  const AuthenticatedBackBtn = useAuthorizedRender(NavBackBtn, ['user','admin']);
  const UnauthenticatedBackBtn = useUnauthorizedRender(NavBackBtn, ['user','admin']);
  const AuthenticatedToNotifBtn = useAuthorizedRender(NavToNotifBtn, ['user','admin']);
	
  return (
    <header className='header-container'>
      <div className='header-left'>
        <nav className="header-left-nav">
          {location.pathname === '/' && <Logo />}
          {location.pathname === '/signup' && <UnauthenticatedBackBtn />}
          {location.pathname === '/login' && <UnauthenticatedBackBtn />}
          {location.pathname === '/games' && <AuthenticatedBackBtn />}
          {location.pathname.startsWith('/profile') && <AuthenticatedBackBtn />}
          {location.pathname === '/settings' && <AuthenticatedBackBtn />}
          {location.pathname === '/search' && <AuthenticatedBackBtn />}
          {location.pathname === '/friends' && <AuthenticatedBackBtn />}
          {location.pathname === '/notifications' && <AuthenticatedBackBtn />}
        </nav>
      </div>
      <div className="header-middle">
        {location.pathname === '/settings' && <h1 className='settings-page-header'>{Content.settings.title}</h1>}
        {location.pathname === '/friends' && <h1 className='friends-page-header'>{Content.friends.title}</h1>}
        {location.pathname === '/search' && <h1 className='search-page-header'>{Content.search.title}</h1>}
        {location.pathname === '/notifications' && <h1 className='notif-page-header'>{Content.notifs.title}</h1>}
      </div>
      <nav className='header-right-nav'>
        {location.pathname === '/' && <AuthenticatedToProfileButton />}
        {location.pathname === '/' && <AuthenticatedToSearchButton />}
				{location.pathname === '/games' && <AuthenticatedToProfileButton />}
        {location.pathname === '/games' && <AuthenticatedToSearchButton />}
        {location.pathname === '/profile' && <AuthenticatedToNotifBtn />}
        {location.pathname === '/profile' && <AuthenticatedToSettingsButton />}
        {location.pathname.startsWith('/profile') && location.pathname !== '/profile' && <AuthenticatedToProfileButton />}
        {location.pathname.startsWith('/profile') && <AuthenticatedToSearchButton />}
        {location.pathname === '/search' && <AuthenticatedToProfileButton />}
        {location.pathname === '/friends' && <AuthenticatedToSearchButton />}
			</nav>
    </header>
  );
};

export default Header;
