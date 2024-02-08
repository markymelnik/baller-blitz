import { NavBackToFrontButton } from "../../buttons/nav/NavBackToFrontButton.tsx";
import { NavigateToHomeButton } from "../../buttons/nav/NavigateToHomeButton.tsx";
import { useAuthorizedRender } from "../../../hooks/useAuthorizedRender.ts";
import { useUnauthorizedRender } from "../../../hooks/useUnauthorizedRender.ts";
import './fallback.scss';

export const UnauthorizedPage = () => {

  const UnauthNavigateToHomeButton = useUnauthorizedRender(NavigateToHomeButton, ['user','admin']);
  const AuthNavigateToFrontButton = useAuthorizedRender(NavBackToFrontButton, ['user','admin']);

  return (
    <div className='unauthorized-page'>
      <h2 className='fallback-header'>Unauthorized Access</h2>
      <UnauthNavigateToHomeButton />
      <AuthNavigateToFrontButton />
    </div>
  );
};
