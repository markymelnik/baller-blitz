import { Content } from '../../../lib/Content.ts';
import { NavigateToHomeButton } from '../../buttons/nav/NavigateToHomeButton.tsx';
import './fallback.scss';

export const UnauthenticatedPage = () => {

  return (
    <div className='unauthenticated-page'>
      <h2 className='fallback-header'>{Content.fallback.unauthenticated}</h2>
      <NavigateToHomeButton />
    </div>
  );
};
