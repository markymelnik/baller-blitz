import { LoginForm } from '../../components/forms/LoginForm/LoginForm.tsx';
import { NavigateToHomeButton } from '../../components/buttons/nav/NavigateToHomeButton.tsx';

export const LoginPage = () => {

  return (
    <div className='login-page'>
      <LoginForm />
      <NavigateToHomeButton />
    </div>
  );
};
