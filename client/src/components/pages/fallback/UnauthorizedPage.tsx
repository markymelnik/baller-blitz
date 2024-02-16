import { Content } from "../../../lib/Content.ts";
import { NavigateToHomeButton } from "../../buttons/nav/NavigateToHomeButton.tsx";
import './fallback.scss';

export const UnauthorizedPage = () => {

  return (
    <div className='unauthorized-page'>
      <h2 className='fallback-header'>{Content.fallback.unauthorized}</h2>
      <NavigateToHomeButton />
    </div>
  );
};
