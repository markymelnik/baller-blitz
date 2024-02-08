import { SignupForm } from '../../forms/SignupForm/SignupForm.tsx';
import { useDelayNavigate } from '../../../hooks/useDelayNavigate.ts';
import './signup-page.scss';
import './to-login.scss';

export const SignupPage = () => {
  const delayNavigate = useDelayNavigate();

  return (
    <div className='signup-page'>
      <div className='signup-page-wrapper'>
        <SignupForm />
        <div className='signup-page-bot'>
          <div className="sp-message">Already a user?</div>          
          <button
            className='signup-form-to-login'
            onClick={() => delayNavigate('/login')}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
