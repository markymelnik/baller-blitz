import { useState } from 'react';
import { createPortal } from 'react-dom';

import { LogoutButton } from '../../buttons/LogoutButton/LogoutButton';
import { useAccessToken, useAuth, useUserDetails } from '../../../hooks/stateSelectors';
import { useVerify } from '../../../hooks/auth/useVerify';
import { ApiClient } from '../../../api/ApiClient';
import { useWebSocket } from '../../../hooks/useWebSocket';
import './verify-overlay.scss';

export const VerifyEmailOverlay = () => {
  const isAuthenticated = useAuth();
  const isVerified = useVerify();
  const accessToken = useAccessToken()!; // !
  const userDetails = useUserDetails();

  const { emailVerified } = useWebSocket(accessToken);

  const [resendStatus, setResendStatus] = useState<string>('');

  const handleButtonClick = async () => {
		try {
      const response = await ApiClient.resendEmailVerification('/verify', accessToken);

      if (response.status === 200) {
        setResendStatus('disabled');
        setTimeout(() => setResendStatus(''), 5000);
      }
      if (response.status === 429) {
        setResendStatus('limited');
        setTimeout(() => setResendStatus(''), 5000);
      }
    } catch (error) {
      console.error(error);
    }
	};

  if (isAuthenticated && !isVerified && userDetails && !emailVerified) {
    return createPortal(
      <div className='verify-wrapper'>
        <div className='verify-overlay'>
          <div className='verify-overlay-top'>
            {/* <div className="overlay-graphic"></div> */}
          </div>
          <div className='verify-overlay-mid'>
            <div className='verify-step'>You're one step away.</div>
            <div className='verify-title'>Verify your email address.</div>
            <div className='verify-desc'>
              Check your email and click the link to complete your profile.
            </div>
          </div>

          <div className='verify-again'>
            <div className='verify-ask'>Don't see one?</div>
            {resendStatus === '' && (
              <button
                className={`send-new-email-btn`}
                onClick={handleButtonClick}
              >
                Resend verification link
              </button>
            )}
            {resendStatus === 'disabled' && (
              <button
                className={`send-new-email-btn disabled`}
                onClick={handleButtonClick}
              >
                Resend verification link
              </button>
            )}
            {resendStatus === 'limited' && (
              <button
                className={`send-new-email-btn disabled`}
                onClick={handleButtonClick}
              >
                Resend verification link
              </button>
            )}
            {resendStatus === '' && (
              <div className='verify-status'>
                
              </div>
            )}
            {resendStatus === 'disabled' && (
              <div className='verify-status'>
                Sent!
              </div>
            )}
            {resendStatus === 'limited' && (
              <div className='verify-status error'>
                Too many attempts. Wait to try again.
              </div>
            )}

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