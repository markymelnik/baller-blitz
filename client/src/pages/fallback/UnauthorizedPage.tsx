import { NavigateToHomeButton } from "../../components/buttons/NavigateToHomeButton.tsx";

export const UnauthorizedPage = () => {

  return (
    <div className='unauthorized-page'>
      <p>Unauthorized Access</p>
      <NavigateToHomeButton />
    </div>
  );
};
