import { useLocation } from 'react-router-dom';

import { Content } from '../../lib/Content.ts';
import { useAuthorizedRender } from '../../hooks/auth/useAuthorizedRender.ts';
import { NavToProfileBtn } from '../buttons/nav/NavToProfileBtn.tsx';
import { NavToSettingsBtn } from '../buttons/nav/NavToSettingsBtn.tsx';
import { NavToSearchBtn } from '../buttons/nav/NavToSearchBtn.tsx';
import { NavBackBtn } from '../buttons/nav/NavBackBtn.tsx';
import useHeaderHideOnScroll from '../../hooks/page/useHeaderHideOnScroll.ts';
import './header.scss';
import { NavToFriendsBtn } from '../buttons/nav/NavToFriendsBtn.tsx';
import { useUnauthorizedRender } from '../../hooks/auth/useUnauthorizedRender.ts';

export const Header = () => {
  const location = useLocation();

  useHeaderHideOnScroll();

	const AuthenticatedToProfileButton = useAuthorizedRender(NavToProfileBtn, ['user','admin']);
  const AuthenticatedToSettingsButton = useAuthorizedRender(NavToSettingsBtn, ['user','admin']);
  const AuthenticatedToSearchButton = useAuthorizedRender(NavToSearchBtn, ['user','admin']);
  const AuthenticatedBackBtn = useAuthorizedRender(NavBackBtn, ['user','admin']);
  const UnauthenticatedBackBtn = useUnauthorizedRender(NavBackBtn, ['user','admin']);
  const AuthenticatedToFriendsBtn = useAuthorizedRender(NavToFriendsBtn, ['user','admin']);
	
  return (
    <header className='header-container'>
      <div className='header-left'>
        {location.pathname === '/signup' && <UnauthenticatedBackBtn />}
        {location.pathname === '/login' && <UnauthenticatedBackBtn />}
        {location.pathname === '/front' && <AuthenticatedBackBtn />}
        {location.pathname.startsWith('/profile') && <AuthenticatedBackBtn />}
        {location.pathname === '/settings' && <AuthenticatedBackBtn />}
        {location.pathname === '/search' && <AuthenticatedBackBtn />}
        {location.pathname === '/friends' && <AuthenticatedBackBtn />}
        {location.pathname === '/req-friends' && <AuthenticatedBackBtn />}
      </div>
      <div className="header-middle">
        {location.pathname === '/settings' && <div className='settings-page-header'>{Content.settings.title}</div>}
        {location.pathname === '/friends' && <div className='friends-page-header'>Friends</div>}
      </div>
      <div className='header-right'>
        {location.pathname === '/' && <AuthenticatedToProfileButton />}
        {location.pathname === '/' && <AuthenticatedToSearchButton />}
				{location.pathname === '/front' && <AuthenticatedToProfileButton />}
        {location.pathname === '/front' && <AuthenticatedToSearchButton />}
        {location.pathname === '/profile' && <AuthenticatedToFriendsBtn />}
        {location.pathname === '/profile' && <AuthenticatedToSettingsButton />}
        {location.pathname.startsWith('/profile') && location.pathname !== '/profile' && <AuthenticatedToProfileButton />}
        {location.pathname.startsWith('/profile') && <AuthenticatedToSearchButton />}
        {location.pathname === '/search' && <AuthenticatedToProfileButton />}
        {location.pathname === '/friends' && <AuthenticatedToSearchButton />}
			</div>
    </header>
  );
};
