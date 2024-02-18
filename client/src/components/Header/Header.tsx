import { useLocation } from 'react-router-dom';

import { useAuthorizedRender } from '../../hooks/auth/useAuthorizedRender.ts';
import { NavigateToProfileButton } from '../buttons/nav/NavigateToProfileButton.tsx';
import { NavBackToFrontButton } from '../buttons/nav/NavBackToFrontButton.tsx';
import { NavigateToHomeButton } from '../buttons/nav/NavigateToHomeButton.tsx';
import { NavToSettingsButton } from '../buttons/nav/NavToSettingsButton.tsx';
import { NavToProfileFromSettingsButton } from '../buttons/nav/NavToProfileFromSettingsButton.tsx';
import { Content } from '../../lib/Content.ts';

import useHeaderHideOnScroll from '../../hooks/page/useHeaderHideOnScroll.ts';
import './header.scss';

export const Header = () => {
  const location = useLocation();

  useHeaderHideOnScroll();

	const AuthenticatedProfileButton = useAuthorizedRender(NavigateToProfileButton, ['user','admin']);
  const AuthenticatedToFrontButton = useAuthorizedRender(NavBackToFrontButton, ['user','admin']);
  const AuthenticatedToSettingsButton = useAuthorizedRender(NavToSettingsButton, ['user','admin']);
  const AuthenticatedToProfileButton = useAuthorizedRender(NavToProfileFromSettingsButton, ['user','admin']);
	
  return (
    <header className='header-container'>
      <div className='header-left'>
        {location.pathname === '/signup' && <NavigateToHomeButton />}
        {location.pathname === '/login' && <NavigateToHomeButton />}
        {location.pathname === '/front' && <NavigateToHomeButton />}
        {location.pathname === '/profile' && <AuthenticatedToFrontButton />}
        {location.pathname === '/settings' && <AuthenticatedToProfileButton />}
      </div>
      <div className="header-middle">
        {location.pathname === '/settings' && <div className='settings-page-header'>{Content.settings.title}</div>}
      </div>
      <div className='header-right'>
				{location.pathname === '/front' && <AuthenticatedProfileButton />}
        {location.pathname === '/profile' && <AuthenticatedToSettingsButton />}
			</div>
    </header>
  );
};
