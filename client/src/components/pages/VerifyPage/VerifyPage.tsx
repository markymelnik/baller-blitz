import { LogoutButton } from '../../buttons/LogoutButton/LogoutButton';
import './verify-page.scss';

export const VerifyPage = () => {
  return (
    <div className='verify-page'>
      <div className='verify-page-title'>Verify your email</div>
      <LogoutButton />
    </div>
  );
};
