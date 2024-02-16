import { Content } from '../../../lib/Content.ts';
import { NavigateToHomeButton } from '../../buttons/nav/NavigateToHomeButton.tsx';
import './fallback.scss';

export const NotFoundPage = () => {

  return (
    <div className='not-found-page'>
      <h2 className='fallback-header'>{Content.fallback.notFound}</h2>
      <NavigateToHomeButton />
    </div>
  );
};
