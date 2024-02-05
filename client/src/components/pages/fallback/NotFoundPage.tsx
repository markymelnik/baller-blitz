import { NavigateToFrontButton } from '../../buttons/nav/NavigateToFrontButton.tsx';
import { NavigateToHomeButton } from '../../buttons/nav/NavigateToHomeButton.tsx';
import { useAuthorizedRender } from '../../../hooks/useAuthorizedRender.ts';
import { useUnauthorizedRender } from '../../../hooks/useUnauthorizedRender.ts';
import './fallback.scss';

export const NotFoundPage = () => {

  const UnauthNavigateToHomeButton = useUnauthorizedRender(NavigateToHomeButton, ['user','admin']);
  const AuthNavigateToFrontButton = useAuthorizedRender(NavigateToFrontButton, ['user','admin']);

  return (
    <div className='not-found-page'>
      <h2 className='fallback-header'>The page you are looking for does not exist.</h2>
      <UnauthNavigateToHomeButton />
      <AuthNavigateToFrontButton />
    </div>
  );
};
