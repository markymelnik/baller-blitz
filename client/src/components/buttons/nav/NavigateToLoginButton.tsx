import { NavigateToButtonCreator } from './NavigateToButtonCreator.tsx';
import './nav-to-btns.scss';

type LoginButtonProps = {
  addClass: string,
}

export const NavigateToLoginButton = ({ addClass }: LoginButtonProps ) => {
  const className = `nav-to-login-btn ${addClass}`;
  return (
    <NavigateToButtonCreator
      toRoute={'/login'}
      buttonText={'Login'}
      className={className}
    />
  );
};
