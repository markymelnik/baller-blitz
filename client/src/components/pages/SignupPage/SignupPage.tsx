import { NavToLoginFromSignupButton } from '../../buttons/nav/signuplogin/NavToLoginFromSignupButton.tsx';
import { Content } from '../../../lib/Content.ts';

import { SignupForm } from './SignupForm/SignupForm.tsx';
import './signup-page.scss';

const SignupPage = () => {

  return (
    <main className='signup-page main-page unauth'>
      
      <div className="sp-left">

      </div>
      <div className="sp-right">
      <h1 className="sp-heading">Baller Blitz</h1>
      <div className='signup-page-wrapper'>
        <SignupForm />
        <div className='signup-page-bot'>
          <div className="sp-message">{Content.auth.signup.alreadyUser}</div>          
          <NavToLoginFromSignupButton />
        </div>
      </div>
      </div>
    
    </main>
  );
};

export default SignupPage;