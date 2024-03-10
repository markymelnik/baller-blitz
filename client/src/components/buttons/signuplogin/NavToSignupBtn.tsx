import { useNavigate } from 'react-router-dom';
import './nav-to-auth.scss';

export const NavToSignupBtn = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signup');
  }

  return (
    <button className='nav-to-signup-btn' onClick={handleClick}>
    <span>Signup</span>
    <svg width='1rem' height='0.6rem' viewBox='0 0 13 10'>
      <path d='M1,5 L11,5'></path>
      <polyline points='8 1 12 5 8 9'></polyline>
    </svg>
  </button>
  );
};
