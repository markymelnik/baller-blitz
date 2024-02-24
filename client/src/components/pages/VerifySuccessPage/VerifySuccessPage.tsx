import { Content } from '../../../lib/Content';
import { NavToHomeBtn } from '../../buttons/nav/NavToHomeBtn';
import './verify-success-page.scss';

const VerifySuccessPage = () => {
  return (
    <main className='verify-success-page main-page'>
      <div className='verify-success-title'>
        {Content.verifySuccess.message}
      </div>
      <NavToHomeBtn />
    </main>
  );
};

export default VerifySuccessPage;
