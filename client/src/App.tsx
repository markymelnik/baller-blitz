import Logo from './components/Logo/Logo.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { SignupPage } from './pages/SignupPage.tsx';

const App = () => {
  return (
    <div className='app-container'>
      <Logo />
      <SignupPage />
      <LoginPage />
    </div>
  );
};

export default App;
