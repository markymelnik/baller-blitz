import { Content } from '../../../lib/Content';
import './logo.scss';

const Logo = () => {
  return (
    <h1 className='logo-container'>
      {Content.main.title.ball}
      {Content.main.title.battle}
    </h1>
  );
};

export default Logo;
