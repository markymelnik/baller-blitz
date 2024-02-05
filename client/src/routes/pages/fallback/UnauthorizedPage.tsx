import { NavigateToFrontButton } from "../../../components/buttons/nav/NavigateToFrontButton.tsx";
import { NavigateToHomeButton } from "../../../components/buttons/nav/NavigateToHomeButton.tsx";
import { useAuthorizedRender } from "../../../hooks/useAuthorizedRender.ts";
import { useUnauthorizedRender } from "../../../hooks/useUnauthorizedRender.ts";
import './fallback.scss';

export const UnauthorizedPage = () => {

  const UnauthNavigateToHomeButton = useUnauthorizedRender(NavigateToHomeButton, ['user','admin']);
  const AuthNavigateToFrontButton = useAuthorizedRender(NavigateToFrontButton, ['user','admin']);

  return (
    <div className='unauthorized-page'>
      <h2 className='fallback-header'>Unauthorized Access</h2>
      <UnauthNavigateToHomeButton />
      <AuthNavigateToFrontButton />
    </div>
  );
};
