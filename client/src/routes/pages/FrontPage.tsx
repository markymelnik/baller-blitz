import { FrontButtons } from '../../components/Front/FrontButtons/FrontButtons.tsx';
import { FrontWelcome } from '../../components/Front/FrontWelcome/FrontWelcome.tsx';
import { LogoutButton } from '../../components/buttons/LogoutButton/LogoutButton.tsx';
import { NavigateToProfileButton } from '../../components/buttons/nav/NavigateToProfileButton.tsx';
import { useAuthorizedRender } from '../../hooks/useAuthorizedRender.ts';
import { useUnauthorizedRender } from '../../hooks/useUnauthorizedRender.ts';

export const FrontPage = () => {
	const AuthorizedProfileButton = useAuthorizedRender(NavigateToProfileButton, ['user','admin']);
	const UnauthorizedFrontButtons = useUnauthorizedRender(FrontButtons, ['user','admin']);
	const AuthorizedLogoutButton = useAuthorizedRender(LogoutButton, ['user','admin']);

  return (
    <div className='front-page'>
      <FrontWelcome />
      <AuthorizedProfileButton />
      <UnauthorizedFrontButtons />
      <AuthorizedLogoutButton />
    </div>
  );
};
