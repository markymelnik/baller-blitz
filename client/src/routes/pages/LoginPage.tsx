import { LoginForm } from '../../components/forms/LoginForm/LoginForm.tsx';
import { NavigateToHomeButton } from '../../components/buttons/nav/NavigateToHomeButton.tsx';
import { useDelayNavigate } from '../../hooks/useDelayNavigate.ts';

export const LoginPage = () => {
  const delayNavigate = useDelayNavigate();

  return (
    <div className='login-page'>
      <div className="login-form-wrapper">
        <LoginForm />
          <button className="login-form-to-signup" onClick={() => delayNavigate('/signup')}>Sign Up</button>
      </div>
      <NavigateToHomeButton />
    </div>
  );
};
