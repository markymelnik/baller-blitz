import { useNavigate } from 'react-router-dom';

import { Content } from '../../../lib/Content';
import './logo.scss';

export const Logo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  }

  return (
    <h1 className='logo-container' onClick={handleClick}>
      {Content.main.title.baller}
      {Content.main.title.blitz}
    </h1>
  );
};
