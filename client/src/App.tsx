import Logo from './components/Logo/Logo.tsx';
import { SignupPage } from './pages/SignupPage.tsx';

const App = () => {
  return (
    <div className='app-container'>
      <Logo />
      <SignupPage />
    </div>
  );
};

export default App;
