import { LoginForm } from '../../forms/LoginForm/LoginForm.tsx';
import { NavToSignupFromLoginButton } from '../../buttons/nav/signuplogin/NavToSignupFromLoginButton.tsx';
import './login-page.scss';
import { Content } from '../../../lib/Content.ts';

export const LoginPage = () => {

  return (
    <main className='login-page'>
      <div className='login-form-wrapper'>
        <LoginForm />
        <div className='login-page-bot'>
        <div className="lp-message">{Content.auth.login.needAccount}</div> 
          <NavToSignupFromLoginButton />
        </div>
      </div>
    </main>
  );
};
