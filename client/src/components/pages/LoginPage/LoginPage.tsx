import { LoginForm } from '../../forms/LoginForm/LoginForm.tsx';
import { NavigateToHomeButton } from '../../buttons/nav/NavigateToHomeButton.tsx';
import { useDelayNavigate } from '../../../hooks/useDelayNavigate.ts';
import './login-page.scss';

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
