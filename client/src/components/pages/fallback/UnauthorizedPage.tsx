import { Content } from "../../../lib/Content.ts";
import { NavBackHomeBtn } from "../../buttons/nav/NavBackHomeBtn.tsx";
import './fallback.scss';

const UnauthorizedPage = () => {
  return (
    <main className='unauthorized-page'>
      <h2 className='fallback-header'>{Content.fallback.unauthorized}</h2>
      <nav className='nav-home-wrapper'>
        <NavBackHomeBtn />
      </nav>
    </main>
  );
};

export default UnauthorizedPage;