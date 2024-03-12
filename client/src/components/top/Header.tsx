import { useLocation } from 'react-router-dom';

import { Content } from '../../lib/Content.ts';
import { useAuthorizedRender } from '../../hooks/auth/useAuthorizedRender.ts';
import { useIsMobile } from '../../hooks/page/useIsMobile.ts';
import { NavToSearchBtn } from '../buttons/nav/NavToSearchBtn.tsx';
import { NavToNotifBtn } from '../buttons/nav/NavToNotifBtn.tsx';
import { NavBackBtn } from '../buttons/nav/NavBackBtn.tsx';
/* import useHeaderHideOnScroll from '../../hooks/page/useHeaderHideOnScroll.ts'; */
import { useUnauthorizedRender } from '../../hooks/auth/useUnauthorizedRender.ts';
import { MobileOverlayBtn } from '../buttons/MobileOverlayBtn/MobileOverlayBtn.tsx';
import { ProfileBtn } from '../buttons/ProfileBtn/ProfileBtn.tsx';

import { Logo } from './Logo/Logo.tsx';
import './header.scss';

const Header = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
/*   useHeaderHideOnScroll();
 */

  const UnauthenticatedHeader = useUnauthorizedRender(
    () =>
      location.pathname !== '/' && (
        <nav className='back-nav-container'>
          <NavBackBtn />
        </nav>
      ),
    ['user', 'admin']
  );

  const AuthenticatedHeader = useAuthorizedRender(
    () => (
      <header className='header-container'>
        <nav className='header-left-nav'>
          <>
            {location.pathname === '/' && !isMobile && <Logo />}
            {location.pathname === '/' && isMobile && <MobileOverlayBtn />}
            {location.pathname === '/games' && <NavBackBtn />}
            {location.pathname.startsWith('/profile') && (
              <NavBackBtn />
            )}
            {location.pathname === '/settings' && <NavBackBtn />}
            {location.pathname === '/search' && <NavBackBtn />}
            {location.pathname === '/friends' && <NavBackBtn />}
            {location.pathname === '/notifications' && <NavBackBtn />}
          </>
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
              <h1 className='header-h1'>User</h1>
            )}
        </div>

        <nav className='header-right-nav'>
          {isMobile ? (
            <>
              {' '}
              {location.pathname === '/' && <NavToSearchBtn />}
              {location.pathname === '/' && <ProfileBtn />}
              {location.pathname === '/games' && (
                <NavToSearchBtn />
              )}
              {location.pathname === '/games' && (
                <ProfileBtn />
              )}
              {location.pathname === '/profile' && <NavToNotifBtn />}
              {location.pathname.startsWith('/profile') &&
                location.pathname !== '/profile' && (
                  <ProfileBtn />
                )}
              {location.pathname.startsWith('/profile') &&
                location.pathname !== '/profile' && (
                  <NavToSearchBtn />
                )}
              {location.pathname === '/search' && (
                <ProfileBtn />
              )}
              {location.pathname === '/friends' && (
                <NavToSearchBtn />
              )}
            </>
          ) : (
            <>
              {location.pathname === '/' && <NavToSearchBtn />}
              {location.pathname === '/' && <NavToNotifBtn />}
              {location.pathname === '/' && 
              
                  <ProfileBtn />
              
              }
            </>
          )}
        </nav>
      </header>
    ),
    ['user', 'admin']
  ); 

  return (
    <>
      <UnauthenticatedHeader />
      <AuthenticatedHeader />
    </>
  );
};

export default Header;
