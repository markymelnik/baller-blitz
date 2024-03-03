import { useNavigate } from 'react-router-dom';

import { Content } from '../../../lib/Content';
import './logo.scss';

const Logo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  }

  return (
    <h1 className='logo-container' onClick={handleClick}>
      {Content.main.title.ball}
      {Content.main.title.battle}
    </h1>
  );
};

export default Logo;
