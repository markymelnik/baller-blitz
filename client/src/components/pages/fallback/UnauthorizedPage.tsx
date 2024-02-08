import { NavigateToHomeButton } from "../../buttons/nav/NavigateToHomeButton.tsx";
import './fallback.scss';

export const UnauthorizedPage = () => {

  return (
    <div className='unauthorized-page'>
      <h2 className='fallback-header'>Unauthorized Access</h2>
      <NavigateToHomeButton />
    </div>
  );
};
