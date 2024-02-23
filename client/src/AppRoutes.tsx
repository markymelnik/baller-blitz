import { Route } from 'react-router-dom';

import { PublicRoutes } from './routes/PublicRoutes';
import { PrivateRoutes } from './routes/PrivateRoutes';
import { HomePage } from './components/pages/HomePage/HomePage';
import { SignupPage } from './components/pages/SignupPage/SignupPage';
import { LoginPage } from './components/pages/LoginPage/LoginPage';
import { GamesPage } from './components/pages/GamesPage/GamesPage';
import { ProfilePage } from './components/pages/ProfilePage/ProfilePage';
import { UserProfile } from './components/pages/UserProfile/UserProfile';
import { SettingsPage } from './components/pages/SettingsPage/SettingsPage';
import { SearchPage } from './components/pages/SearchPage/SearchPage';
import { VerifySuccessPage } from './components/pages/VerifySuccessPage/VerifySuccessPage';
import { FriendsPage } from './components/pages/FriendsPage/FriendsPage';
import { NotificationsPage } from './components/pages/NotificationsPage/NotificationsPage';
import { UnauthenticatedPage } from './components/pages/fallback/UnauthenticatedPage';
import { UnauthorizedPage } from './components/pages/fallback/UnauthorizedPage';
import { NotFoundPage } from './components/pages/fallback/NotFoundPage';

export const AppRoutes = [
  <Route key='home' path='/' element={<HomePage />} />,

  <Route key='public' element={<PublicRoutes />}>
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/login' element={<LoginPage />} />
  </Route>,

  <Route key='private' element={<PrivateRoutes allowedRoles={['admin', 'user']} />}>
    <Route path='/games' element={<GamesPage />} />
    <Route path='/profile' element={<ProfilePage />} />
    <Route path='/profile/:username' element={<UserProfile />} />
    <Route path='/settings' element={<SettingsPage />} />
    <Route path='/search' element={<SearchPage />} />
    <Route path='/verify-success' element={<VerifySuccessPage />} />
    <Route path='/friends' element={<FriendsPage />} />
    <Route path='/notifications' element={<NotificationsPage />} />
  </Route>,

  <Route key='unauthenticated' path='/unauthenticated' element={<UnauthenticatedPage />} />,
  <Route key='unauthorized' path='/unauthorized' element={<UnauthorizedPage />} />,
  <Route key='notfound' path='*' element={<NotFoundPage />} />,
];
