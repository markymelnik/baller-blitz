import { SignupForm } from '../../forms/SignupForm/SignupForm.tsx';
import { NavToLoginFromSignupButton } from '../../buttons/nav/signuplogin/NavToLoginFromSignupButton.tsx';
import './signup-page.scss';
import { Content } from '../../../lib/Content.ts';

export const SignupPage = () => {

  return (
    <div className='signup-page'>
      <div className='signup-page-wrapper'>
        <SignupForm />
        <div className='signup-page-bot'>
          <div className="sp-message">{Content.auth.signup.alreadyUser}</div>          
          <NavToLoginFromSignupButton />
        </div>
      </div>
    </div>
  );
};
