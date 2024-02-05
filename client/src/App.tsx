import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LoginPage } from './routes/pages/LoginPage.tsx';
import { ProfilePage } from './routes/pages/ProfilePage.tsx';
import { SignupPage } from './routes/pages/SignupPage.tsx';
import { HomePage } from './routes/pages/HomePage.tsx';
import { UnauthorizedPage } from './routes/pages/fallback/UnauthorizedPage.tsx';
import { UnauthenticatedPage } from './routes/pages/fallback/UnauthenticatedPage.tsx';
import { NotFoundPage } from './routes/pages/fallback/NotFoundPage.tsx';
import { PrivateRoutes } from './routes/PrivateRoutes.tsx';
import { useRefreshToken } from './hooks/useRefreshToken.ts';
import { LoadingScreen } from './LoadingScreen/LoadingScreen.tsx';
import { FrontPage } from './routes/pages/FrontPage.tsx';
import { PublicRoutes } from './routes/PublicRoutes.tsx';
import { useGetGamesToday } from './GameData/useGetGamesToday.ts';

const App = () => {
  useRefreshToken();
  useGetGamesToday();

  return (
    <div className='app-container'>
      <LoadingScreen />
      <BrowserRouter>
        <Routes>
          {
            <Route element={<PublicRoutes />}>
              <Route path='/' element={<HomePage />} />
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
