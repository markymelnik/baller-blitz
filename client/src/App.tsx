import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LoginPage } from './routes/pages/LoginPage.tsx';
import { ProfilePage } from './routes/pages/ProfilePage.tsx';
import { SignupPage } from './routes/pages/SignupPage.tsx';
import { FrontPage } from './routes/pages/FrontPage.tsx';
import { UnauthorizedPage } from './routes/pages/fallback/UnauthorizedPage.tsx';
import { UnauthenticatedPage } from './routes/pages/fallback/UnauthenticatedPage.tsx';
import { NotFoundPage } from './routes/pages/fallback/NotFoundPage.tsx';
import { PrivateRoutes } from './routes/PrivateRoutes.tsx';
import { useRefreshToken } from './hooks/useRefreshToken.ts';

const App = () => {
  useRefreshToken();

  return (
    <div className='app-container'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FrontPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
          {
            <Route element={<PrivateRoutes allowedRoles={['admin', 'user']} />}>
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
