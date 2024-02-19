import { useLocation } from 'react-router-dom';

import { Content } from '../../lib/Content.ts';
import { useAuthorizedRender } from '../../hooks/auth/useAuthorizedRender.ts';
import { NavigateToProfileButton } from '../buttons/nav/NavigateToProfileButton.tsx';
import { NavBackToFrontButton } from '../buttons/nav/NavBackToFrontButton.tsx';
import { NavigateToHomeButton } from '../buttons/nav/NavigateToHomeButton.tsx';
import { NavToSettingsButton } from '../buttons/nav/NavToSettingsButton.tsx';
import { NavToProfileFromSettingsButton } from '../buttons/nav/NavToProfileFromSettingsButton.tsx';
import useHeaderHideOnScroll from '../../hooks/page/useHeaderHideOnScroll.ts';
import './header.scss';
import { NavToSearchFromProfileBtn } from '../buttons/nav/NavToSearchFromProfileBtn.tsx';
import { NavToSearchBtn } from '../buttons/nav/NavToSearchBtn.tsx';

export const Header = () => {
  const location = useLocation();

  useHeaderHideOnScroll();

  const AuthenticatedToHomeButton = useAuthorizedRender(NavigateToHomeButton, ['user','admin']);
	const AuthenticatedProfileButton = useAuthorizedRender(NavigateToProfileButton, ['user','admin']);
  const AuthenticatedToFrontButton = useAuthorizedRender(NavBackToFrontButton, ['user','admin']);
  const AuthenticatedToSettingsButton = useAuthorizedRender(NavToSettingsButton, ['user','admin']);
  const AuthenticatedToProfileButton = useAuthorizedRender(NavToProfileFromSettingsButton, ['user','admin']);
  const AuthenticatedNavToSearchFromProfileButton = useAuthorizedRender(NavToSearchFromProfileBtn, ['user','admin']);
  const AuthenticatedToSearchButton = useAuthorizedRender(NavToSearchBtn, ['user','admin']);
	
  return (
    <header className='header-container'>
      <div className='header-left'>
        {location.pathname === '/signup' && <NavigateToHomeButton />}
        {location.pathname === '/login' && <NavigateToHomeButton />}
        {location.pathname === '/front' && <AuthenticatedToHomeButton />}
        {location.pathname === '/profile' && <AuthenticatedToFrontButton />}
        {location.pathname.startsWith('/profile') && location.pathname !== '/profile' && <AuthenticatedNavToSearchFromProfileButton />}
        {location.pathname === '/settings' && <AuthenticatedToProfileButton />}
        {location.pathname === '/search' && <AuthenticatedToHomeButton />}
      </div>
      <div className="header-middle">
        {location.pathname === '/settings' && <div className='settings-page-header'>{Content.settings.title}</div>}
      </div>
      <div className='header-right'>
				{location.pathname === '/front' && <AuthenticatedProfileButton />}
        {location.pathname === '/profile' && <AuthenticatedToSearchButton />}
        {location.pathname === '/profile' && <AuthenticatedToSettingsButton />}
        {location.pathname === '/search' && <AuthenticatedProfileButton />}
        {location.pathname === '/' && <AuthenticatedToSearchButton />}
			</div>
    </header>
  );
};
