import { useLocation } from 'react-router-dom';

import { useAuthorizedRender } from '../../hooks/useAuthorizedRender.ts';
import { NavigateToProfileButton } from '../buttons/nav/NavigateToProfileButton.tsx';
import './header.scss';
import { NavigateToFrontButton } from '../buttons/nav/NavigateToFrontButton.tsx';

export const Header = () => {
	const location = useLocation();

	const AuthenticatedProfileButton = useAuthorizedRender(NavigateToProfileButton, ['user','admin']);
  const AuthenticatedFrontButton = useAuthorizedRender(NavigateToFrontButton, ['user','admin']);
	
  return (
    <header className='header'>
      <div className='header-left'>
        {location.pathname !== '/front' && <AuthenticatedFrontButton />}
      </div>
      <div className='header-right'>
				{location.pathname !== '/profile' && <AuthenticatedProfileButton />}
			</div>
    </header>
  );
};
