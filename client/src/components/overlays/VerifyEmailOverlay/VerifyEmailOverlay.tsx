import { createPortal } from 'react-dom';

import { LogoutButton } from '../../buttons/LogoutButton/LogoutButton';
import { useAccessToken, useAuth, useUserDetails } from '../../../hooks/stateSelectors';
import { useVerify } from '../../../hooks/auth/useVerify';
import './verify-email-overlay.scss';
import { ApiClient } from '../../../api/ApiClient';

export const VerifyEmailOverlay = () => {
  const isAuthenticated = useAuth();
  const isVerified = useVerify();
  const accessToken = useAccessToken();
  const userDetails = useUserDetails();

  const handleButtonClick = async () => {
    console.log(accessToken);
		try {
      const responseData = await ApiClient.resendEmailVerification('/verify', accessToken);
      console.log('Email verification sent', responseData);
    } catch (error) {
      console.error(error);
    }
	};

  if (isAuthenticated && !isVerified && userDetails) {
    return createPortal(
      <div className='verify-wrapper'>
        <div className='verify-page'>
          <div className='verify-page-title'>Verify your email</div>
          <div className='verify-again'>
            <div className='verify-ask'>Don't see one?</div>
            <button className='send-new-email-btn' onClick={handleButtonClick}>
              Send new email
            </button>
          </div>
          <LogoutButton />
        </div>
      </div>,
      document.getElementById('portal-root')!
    );
  } else {
    return null;
  }
};