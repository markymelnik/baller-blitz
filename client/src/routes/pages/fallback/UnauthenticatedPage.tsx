import { NavigateToLoginButton } from '../../../components/buttons/nav/NavigateToLoginButton.tsx';
import { NavigateToHomeButton } from '../../../components/buttons/nav/NavigateToHomeButton.tsx';

export const UnauthenticatedPage = () => {

  return (
    <div className='unauthenticated-page'>
      <p>Unauthenticated Access</p>
      <NavigateToHomeButton />
      <NavigateToLoginButton />
    </div>
  );
};
