import { Content } from '../../../lib/Content.ts';
import { NavBackHomeBtn } from '../../buttons/nav/NavBackHomeBtn.tsx';
import './fallback.scss';

const NotFoundPage = () => {
  return (
    <main className='not-found-page'>
      <h2 className='fallback-header'>{Content.fallback.notFound}</h2>
      <nav className='nav-home-wrapper'>
        <NavBackHomeBtn />
      </nav>
    </main>
  );
};

export default NotFoundPage;