import { BrowserRouter, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useRefreshUserSession } from './hooks/auth/useRefreshUserSession.ts';
import ScrollToTop from './hooks/page/useScrollToTop.ts';
import { Header } from './components/header/Header.tsx';
import AuthenticationCheck from './AuthenticationCheck.tsx';
import { VerifyEmailOverlay } from './components/overlays/VerifyOverlay/VerifyOverlay.tsx';
import { SearchProvider } from './contexts/SearchProvider.tsx';
import { PaginationProvider } from './contexts/PaginationProvider.tsx';
import { AppRoutes } from './AppRoutes.tsx';

const App = () => {
  useRefreshUserSession();

  document.body.classList.add('light');

  const queryClient = new QueryClient();

  return (
    <SearchProvider>
    <PaginationProvider>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <div className='app-container'>
        <VerifyEmailOverlay />
        <AuthenticationCheck>
          <ScrollToTop />
          <Header />
          <Routes>
            {AppRoutes}
          </Routes>
        </AuthenticationCheck>
      </div>
    </BrowserRouter>
    </QueryClientProvider>
    </PaginationProvider>
    </SearchProvider>
  );
};

export default App;
