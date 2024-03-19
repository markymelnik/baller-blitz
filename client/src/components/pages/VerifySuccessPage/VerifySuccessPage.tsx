import { Content } from '../../../lib/Content';
import { NavBackHomeBtn } from '../../buttons/nav/NavBackHomeBtn';
import './verify-success-page.scss';

const VerifySuccessPage = () => {
  return (
    <main className='verify-success-page'>
      <div className='verify-success-title'>
        {Content.verifySuccess.message}
      </div>
      <NavBackHomeBtn />
    </main>
  );
};

export default VerifySuccessPage;
