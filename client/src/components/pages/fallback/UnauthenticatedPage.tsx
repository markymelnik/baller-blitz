import { Content } from '../../../lib/Content.ts';
import { NavBackHomeBtn } from '../../buttons/nav/NavBackHomeBtn.tsx';
import './fallback.scss';

const UnauthenticatedPage = () => {
  return (
    <main className='unauthenticated-page'>
      <h2 className='fallback-header'>{Content.fallback.unauthenticated}</h2>
      <nav className='nav-home-wrapper'>
        <NavBackHomeBtn />
      </nav>
    </main>
  );
};

export default UnauthenticatedPage;
