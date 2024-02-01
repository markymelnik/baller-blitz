import { NavigateToHomeButton } from '../../../components/buttons/nav/NavigateToHomeButton.tsx';

export const NotFoundPage = () => {
  return (
    <div className='not-found-page'>
      <p>The page you are looking for does not exist.</p>
      <NavigateToHomeButton />
    </div>
  );
};
