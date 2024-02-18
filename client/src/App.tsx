import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { LoginPage } from './components/pages/LoginPage/LoginPage.tsx';
import { ProfilePage } from './components/pages/ProfilePage/ProfilePage.tsx';
import { SignupPage } from './components/pages/SignupPage/SignupPage.tsx';
import { HomePage } from './components/pages/HomePage/HomePage.tsx';
import { UnauthorizedPage } from './components/pages/fallback/UnauthorizedPage.tsx';
import { UnauthenticatedPage } from './components/pages/fallback/UnauthenticatedPage.tsx';
import { NotFoundPage } from './components/pages/fallback/NotFoundPage.tsx';
import { PrivateRoutes } from './routes/PrivateRoutes.tsx';
import { useRefreshUserSession } from './hooks/auth/useRefreshUserSession.ts';
import { FrontPage } from './components/pages/FrontPage/FrontPage.tsx';
import { PublicRoutes } from './routes/PublicRoutes.tsx';
import ScrollToTop from './hooks/page/useScrollToTop.ts';
import { Header } from './components/header/Header.tsx';
import AuthenticationCheck from './AuthenticationCheck.tsx';
import { VerifySuccessPage } from './components/pages/VerifySuccessPage/VerifySuccessPage.tsx';
import { VerifyEmailOverlay } from './components/overlays/VerifyOverlay/VerifyOverlay.tsx';
import { SettingsPage } from './components/pages/SettingsPage/SettingsPage.tsx';
import { SearchPage } from './components/pages/SearchPage/SearchPage.tsx';

const App = () => {
  useRefreshUserSession();

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <div className='app-container'>
        <VerifyEmailOverlay />
        <AuthenticationCheck>
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            {
              <Route element={<PublicRoutes />}>
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/login' element={<LoginPage />} />
              </Route>
            }
            {
              <Route
                element={<PrivateRoutes allowedRoles={['admin', 'user']} />}
              >
                <Route path='/front' element={<FrontPage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/settings' element={<SettingsPage />} />
                <Route path='/search' element={<SearchPage />} />
                <Route path='/verify-success' element={<VerifySuccessPage />} />
              </Route>
            }
            
            <Route path='/unauthenticated' element={<UnauthenticatedPage />} />
            <Route path='/unauthorized' element={<UnauthorizedPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </AuthenticationCheck>
      </div>
    </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
