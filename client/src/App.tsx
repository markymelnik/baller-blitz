import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LoginPage } from './components/pages/LoginPage/LoginPage.tsx';
import { ProfilePage } from './components/pages/ProfilePage/ProfilePage.tsx';
import { SignupPage } from './components/pages/SignupPage/SignupPage.tsx';
import { HomePage } from './components/pages/HomePage/HomePage.tsx';
import { UnauthorizedPage } from './components/pages/fallback/UnauthorizedPage.tsx';
import { UnauthenticatedPage } from './components/pages/fallback/UnauthenticatedPage.tsx';
import { NotFoundPage } from './components/pages/fallback/NotFoundPage.tsx';
import { PrivateRoutes } from './routes/PrivateRoutes.tsx';
import { useRefreshUserSession } from './hooks/auth/useRefreshUserSession.ts';
import { LoadingScreen } from './components/loading-screen/LoadingScreen.tsx';
import { FrontPage } from './components/pages/FrontPage/FrontPage.tsx';
import { PublicRoutes } from './routes/PublicRoutes.tsx';
import ScrollToTop from './hooks/page/useScrollToTop.ts';
import { useAuthLoading } from './hooks/stateSelectors.ts';
import { Header } from './components/header/Header.tsx';

const App = () => {
  useRefreshUserSession();

  const authenticationIsProcessing = useAuthLoading();

  if (authenticationIsProcessing) {
    return <LoadingScreen />;
  }

  return (
    <div className='app-container'>
      <LoadingScreen />
      <BrowserRouter>
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
            <Route element={<PrivateRoutes allowedRoles={['admin', 'user']} />}>
              <Route path='/front' element={<FrontPage />} />
              <Route path='/profile' element={<ProfilePage />} />
            </Route>
          }
          <Route path='/unauthenticated' element={<UnauthenticatedPage />} />
          <Route path='/unauthorized' element={<UnauthorizedPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
