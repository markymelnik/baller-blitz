import { Content } from '../../../lib/Content.ts';
import { NavToHomeBtn } from '../../buttons/nav/NavToHomeBtn.tsx';
import './fallback.scss';

const NotFoundPage = () => {

  return (
    <main className='not-found-page'>
      <h2 className='fallback-header'>{Content.fallback.notFound}</h2>
      <nav className="nav-home-wrapper">
      <NavToHomeBtn />
      </nav>
    </main>
  );
};

export default NotFoundPage;