import { Content } from '../../../lib/Content.ts';
import { NavToHomeBtn } from '../../buttons/nav/NavToHomeBtn.tsx';
import './fallback.scss';

export const UnauthenticatedPage = () => {

  return (
    <main className='unauthenticated-page'>
      <h2 className='fallback-header'>{Content.fallback.unauthenticated}</h2>
      <nav className="nav-home-wrapper">
      <NavToHomeBtn />
      </nav>
    </main>
  );
};
