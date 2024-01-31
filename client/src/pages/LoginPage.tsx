import { LoginForm } from '../components/LoginForm/LoginForm.tsx';
import { NavigateToHomeButton } from '../components/buttons/NavigateToHomeButton.tsx';

export const LoginPage = () => {

  return (
    <div className='login-page'>
      <LoginForm />
      <NavigateToHomeButton />
    </div>
  );
};
