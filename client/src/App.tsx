import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LoginPage } from './pages/LoginPage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { SignupPage } from './pages/SignupPage.tsx';
import { FrontPage } from './pages/FrontPage.tsx';
import { UnauthorizedPage } from './pages/fallback/UnauthorizedPage.tsx';
import { UnauthenticatedPage } from './pages/fallback/UnauthenticatedPage.tsx';
import { NotFoundPage } from './pages/fallback/NotFoundPage.tsx';
import { PrivateRoutes } from './PrivateRoutes.tsx';

const App = () => {
  return (
    <div className='app-container'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FrontPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
          {<Route element={<PrivateRoutes allowedRoles={['admin', 'user']} />}>
            <Route path='/profile' element={<ProfilePage />} />
          </Route>}
          <Route path='/unauthenticated' element={<UnauthenticatedPage />} />
          <Route path='/unauthorized' element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
