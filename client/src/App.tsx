import { BrowserRouter, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Suspense, lazy } from 'react';

import { useRefreshUserSession } from './hooks/auth/useRefreshUserSession.ts';
import ScrollToTop from './hooks/page/useScrollToTop.ts';
import AuthenticationCheck from './AuthenticationCheck.tsx';
import { SearchProvider } from './contexts/SearchProvider.tsx';
import { PaginationProvider } from './contexts/PaginationProvider.tsx';
import AppRoutes from './AppRoutes.tsx';
import { LoadingScreen } from './components/loading-screen/LoadingScreen.tsx';
import { TopBanner } from './TopBanner/TopBanner.tsx';

const Header = lazy(() => import('./components/top/Header.tsx'));
const VerifyEmailOverlay = lazy(() => import('./components/overlays/VerifyOverlay/VerifyOverlay.tsx'));

const App = () => {
  useRefreshUserSession();

  document.body.classList.add('light');

  const queryClient = new QueryClient();

  return (
    <SearchProvider>
    <PaginationProvider>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TopBanner />
      <div className='app-container'>
        <AuthenticationCheck>
          <ScrollToTop />
          <Suspense fallback={<LoadingScreen />}>
            <VerifyEmailOverlay />
            <Header />
            <Routes>
              {AppRoutes}
            </Routes>
          </Suspense>
        </AuthenticationCheck>
      </div>
    </BrowserRouter>
    </QueryClientProvider>
    </PaginationProvider>
    </SearchProvider>
  );
};

export default App;
