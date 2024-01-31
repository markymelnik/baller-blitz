import { NavigateToLoginButton } from '../../components/buttons/NavigateToLoginButton.tsx';
import { NavigateToHomeButton } from '../../components/buttons/NavigateToHomeButton.tsx';

export const UnauthenticatedPage = () => {

  return (
    <div className='unauthenticated-page'>
      <p>Unauthenticated Access</p>
      <NavigateToHomeButton />
      <NavigateToLoginButton />
    </div>
  );
};
