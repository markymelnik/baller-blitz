import { Route } from 'react-router-dom';
import { lazy } from 'react';

import { PublicRoutes } from './routes/PublicRoutes';
import { PrivateRoutes } from './routes/PrivateRoutes';

const HomePage = lazy(() => import('./components/pages/HomePage/HomePage'));
const SignupPage = lazy(() => import('./components/pages/SignupPage/SignupPage'));
const LoginPage = lazy(() => import('./components/pages/LoginPage/LoginPage'));

const GamesPage = lazy(() => import('./components/pages/GamesPage/GamesPage'));
const ProfilePage = lazy(() => import('./components/pages/ProfilePage/ProfilePage'));
const UserProfile = lazy(() => import('./components/pages/UserProfile/UserProfile'));
const SettingsPage = lazy(() => import('./components/pages/SettingsPage/SettingsPage'));
const SearchPage = lazy(() => import('./components/pages/SearchPage/SearchPage'));
const VerifySuccessPage = lazy(() => import('./components/pages/VerifySuccessPage/VerifySuccessPage'));
const FriendsPage = lazy(() => import('./components/pages/FriendsPage/FriendsPage'));
const NotificationsPage = lazy(() => import('./components/pages/NotificationsPage/NotificationsPage'));

const UnauthenticatedPage = lazy(() => import('./components/pages/fallback/UnauthenticatedPage'));
const UnauthorizedPage = lazy(() => import('./components/pages/fallback/UnauthorizedPage'));
const NotFoundPage = lazy(() => import('./components/pages/fallback/NotFoundPage'));

const AppRoutes = [
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

export default AppRoutes;
