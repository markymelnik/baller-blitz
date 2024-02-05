import { NavigateToFrontButton } from '../../../components/buttons/nav/NavigateToFrontButton.tsx';
import { NavigateToHomeButton } from '../../../components/buttons/nav/NavigateToHomeButton.tsx';
import { useAuthorizedRender } from '../../../hooks/useAuthorizedRender.ts';
import { useUnauthorizedRender } from '../../../hooks/useUnauthorizedRender.ts';
import './fallback.scss';

export const UnauthenticatedPage = () => {

  const UnauthNavigateToHomeButton = useUnauthorizedRender(NavigateToHomeButton, ['user','admin']);
  const AuthNavigateToFrontButton = useAuthorizedRender(NavigateToFrontButton, ['user','admin']);

  return (
    <div className='unauthenticated-page'>
      <h2 className='fallback-header'>Unauthenticated Access</h2>
      <UnauthNavigateToHomeButton />
      <AuthNavigateToFrontButton />
    </div>
  );
};
