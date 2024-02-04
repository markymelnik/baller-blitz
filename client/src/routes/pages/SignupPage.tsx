import { SignupForm } from '../../components/forms/SignupForm/SignupForm.tsx';
import { NavigateToHomeButton } from '../../components/buttons/nav/NavigateToHomeButton.tsx';
import { NavigateToLoginButton } from '../../components/buttons/nav/NavigateToLoginButton.tsx';

export const SignupPage = () => {
  return (
    <div className='signup-page'>
      <div className="signup-page-wrapper">
        <SignupForm />
        <NavigateToLoginButton addClass='signup' />
      </div>
      <NavigateToHomeButton />
    </div>
  );
};
