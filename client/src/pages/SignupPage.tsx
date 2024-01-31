import { SignupForm } from '../components/SignupForm/SignupForm.tsx';
import { NavigateToHomeButton } from '../components/buttons/NavigateToHomeButton.tsx';

export const SignupPage = () => {

  return (
    <div className='signup-page'>
      <SignupForm />
      <NavigateToHomeButton />
    </div>
  );
};
