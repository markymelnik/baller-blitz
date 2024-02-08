import { LoginForm } from '../../forms/LoginForm/LoginForm.tsx';
import { useDelayNavigate } from '../../../hooks/useDelayNavigate.ts';
import './login-page.scss';
import './to-signup.scss';

export const LoginPage = () => {
  const delayNavigate = useDelayNavigate();

  return (
    <div className='login-page'>
      <div className='login-form-wrapper'>
        <LoginForm />
        <div className='login-page-bot'>
        <div className="lp-message">Need an account?</div> 
          <button
            className='login-form-to-signup'
            onClick={() => delayNavigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
