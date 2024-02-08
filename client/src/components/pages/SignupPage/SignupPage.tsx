import { SignupForm } from '../../forms/SignupForm/SignupForm.tsx';
import { NavToLoginFromSignupButton } from '../../buttons/nav/NavToLoginFromSignupButton.tsx';
import './signup-page.scss';
import './to-login.scss';

export const SignupPage = () => {

  return (
    <div className='signup-page'>
      <div className='signup-page-wrapper'>
        <SignupForm />
        <div className='signup-page-bot'>
          <div className="sp-message">Already a user?</div>          
          <NavToLoginFromSignupButton />
        </div>
      </div>
    </div>
  );
};
