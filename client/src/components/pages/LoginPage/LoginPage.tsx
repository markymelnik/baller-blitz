import { NavToSignupFromLoginButton } from '../../buttons/nav/signuplogin/NavToSignupFromLoginButton.tsx';
import { Content } from '../../../lib/Content.ts';

import { LoginForm } from './LoginForm/LoginForm.tsx';
import './login-page.scss';

const LoginPage = () => {

  return (
    <main className='login-page unauth'>
      <div className="lp-left">

      </div>
      <div className="lp-right">
      <h1 className="lp-heading">Baller Blitz</h1>
      <div className='login-form-wrapper'>
      
        <LoginForm />
        <div className='login-page-bot'>
        <div className="lp-message">{Content.auth.login.needAccount}</div> 
          <NavToSignupFromLoginButton />
        </div>
      </div>
      </div>
    
    </main>
  );
};

export default LoginPage;
