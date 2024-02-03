import { SignupForm } from '../../components/forms/SignupForm/SignupForm.tsx';
import { NavigateToHomeButton } from '../../components/buttons/nav/NavigateToHomeButton.tsx';

export const SignupPage = () => {
  return (
    <div className='signup-page'>
      <SignupForm />
      <NavigateToHomeButton />
    </div>
  );
};
