import { SignupForm } from '../../forms/SignupForm/SignupForm.tsx';
import { NavigateToHomeButton } from '../../buttons/nav/NavigateToHomeButton.tsx';
import { useDelayNavigate } from '../../../hooks/useDelayNavigate.ts';
import './signup-page.scss';

export const SignupPage = () => {
  const delayNavigate = useDelayNavigate();
  
  return (
    <div className='signup-page'>
      <div className="signup-page-wrapper">
        <SignupForm />
        <button className="signup-form-to-login" onClick={() => delayNavigate('/login')}>Login</button>
      </div>
      <div className="signup-page-bot">
        <NavigateToHomeButton />
      </div>
    </div>
  );
};
