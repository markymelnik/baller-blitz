import { SignupForm } from '../../components/forms/SignupForm/SignupForm.tsx';
import { NavigateToHomeButton } from '../../components/buttons/nav/NavigateToHomeButton.tsx';
import { useDelayNavigate } from '../../hooks/useDelayNavigate.ts';

export const SignupPage = () => {
  const delayNavigate = useDelayNavigate();
  return (
    <div className='signup-page'>
      <div className="signup-page-wrapper">
        <SignupForm />
        <button className="signup-form-to-login" onClick={() => delayNavigate('/login')}>Login</button>
      </div>
      <NavigateToHomeButton />
    </div>
  );
};
