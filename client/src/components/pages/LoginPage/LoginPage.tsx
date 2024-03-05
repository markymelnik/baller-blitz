import { NavToSignupFromLoginButton } from '../../buttons/nav/signuplogin/NavToSignupFromLoginButton.tsx';
import { Content } from '../../../lib/Content.ts';

import { LoginForm } from './LoginForm/LoginForm.tsx';
import './login-page.scss';

const LoginPage = () => {

  return (
    <main className='login-page main-page'>
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

export default LoginPage;
