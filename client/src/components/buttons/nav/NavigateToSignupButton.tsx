import { NavigateToButtonCreator } from './NavigateToButtonCreator.tsx';
import './nav-to-btns.scss';

type SignupButtonProps = {
  addClass: string,
}

export const NavigateToSignupButton = ({ addClass }: SignupButtonProps) => {
  const className = `nav-to-signup-btn ${addClass}`;
  return (
    <NavigateToButtonCreator
      toRoute={'/signup'}
      buttonText={'Sign Up'}
      className={className}
    />
  );
};
