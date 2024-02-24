import { SignupForm } from '../../forms/SignupForm/SignupForm.tsx';
import { NavToLoginFromSignupButton } from '../../buttons/nav/signuplogin/NavToLoginFromSignupButton.tsx';
import './signup-page.scss';
import { Content } from '../../../lib/Content.ts';

const SignupPage = () => {

  return (
    <main className='signup-page main-page'>
      <div className='signup-page-wrapper'>
        <SignupForm />
        <div className='signup-page-bot'>
          <div className="sp-message">{Content.auth.signup.alreadyUser}</div>          
          <NavToLoginFromSignupButton />
        </div>
      </div>
    </main>
  );
};

export default SignupPage;