import { useLocation } from 'react-router-dom';

import { useAuthorizedRender } from '../../hooks/auth/useAuthorizedRender.ts';
import { NavigateToProfileButton } from '../buttons/nav/NavigateToProfileButton.tsx';
import { NavBackToFrontButton } from '../buttons/nav/NavBackToFrontButton.tsx';
import { NavigateToHomeButton } from '../buttons/nav/NavigateToHomeButton.tsx';
import './header.scss';

export const Header = () => {
	const location = useLocation();

	const AuthenticatedProfileButton = useAuthorizedRender(NavigateToProfileButton, ['user','admin']);
  const AuthenticatedToFrontButton = useAuthorizedRender(NavBackToFrontButton, ['user','admin']);
	
  return (
    <header className='header'>
      <div className='header-left'>
        {location.pathname === '/profile' && <AuthenticatedToFrontButton />}
        {location.pathname === '/front' && <NavigateToHomeButton />}
        {location.pathname === '/signup' && <NavigateToHomeButton />}
        {location.pathname === '/login' && <NavigateToHomeButton />}
      </div>
      <div className='header-right'>
				{location.pathname === '/front' && <AuthenticatedProfileButton />}
			</div>
    </header>
  );
};
