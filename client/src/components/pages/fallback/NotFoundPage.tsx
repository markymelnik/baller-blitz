import { NavigateToHomeButton } from '../../buttons/nav/NavigateToHomeButton.tsx';
import './fallback.scss';

export const NotFoundPage = () => {

  return (
    <div className='not-found-page'>
      <h2 className='fallback-header'>The page you are looking for does not exist.</h2>
      <NavigateToHomeButton />
    </div>
  );
};
