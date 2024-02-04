import { LoginForm } from '../../components/forms/LoginForm/LoginForm.tsx';
import { NavigateToHomeButton } from '../../components/buttons/nav/NavigateToHomeButton.tsx';
import { NavigateToSignupButton } from '../../components/buttons/nav/NavigateToSignupButton.tsx';

export const LoginPage = () => {
  return (
    <div className='login-page'>
      <div className="login-form-wrapper">
        <LoginForm />
        <NavigateToSignupButton addClass='login' />
      </div>
      <NavigateToHomeButton />
    </div>
  );
};
