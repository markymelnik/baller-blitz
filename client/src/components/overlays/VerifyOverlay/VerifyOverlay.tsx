import { useState } from 'react';
import { createPortal } from 'react-dom';

import { LogoutButton } from '../../buttons/LogoutButton/LogoutButton';
import { useAccessToken, useAuth, useUserDetails } from '../../../hooks/stateSelectors';
import { useVerify } from '../../../hooks/auth/useVerify';
import { ApiClient } from '../../../api/ApiClient';
import { useWebSocket } from '../../../hooks/useWebSocket';
import { Content } from '../../../lib/Content';
import './verify-overlay.scss';

const VerifyEmailOverlay = () => {
  const isAuthenticated = useAuth();
  const isVerified = useVerify();
  const accessToken = useAccessToken()!; // !
  const userDetails = useUserDetails();

  const { emailVerified } = useWebSocket(accessToken);

  const [resendStatus, setResendStatus] = useState<string>('');

  const handleButtonClick = async () => {
		try {
      const response = await ApiClient.resendEmailVerification(accessToken);
      console.log(response);
      if (response) {
        if (response.status === 200) {
            setResendStatus('disabled');
            setTimeout(() => setResendStatus(''), 5000);
        } else if (response.status === 429) {
            setResendStatus('limited');
            setTimeout(() => setResendStatus(''), 5000);
        }
      } else {
        console.error('No response received from resendEmailVerification');
      }
    } catch (error) {
      console.error(error);
    }
	};

  if (isAuthenticated && !isVerified && userDetails && !emailVerified) {
    return createPortal(
      <div className='verify-wrapper'>
        <div className='verify-overlay' role="dialog">
          <div className='verify-overlay-top'>
            <div className="overlay-graphic"></div>
          </div>
          <div className='verify-overlay-mid'>
            <div className='verify-step'>{Content.overlay.verifyOverlay.heading[1]}</div>
            <div className='verify-title'>{Content.overlay.verifyOverlay.heading[2]}</div>
            <div className='verify-desc'>
            {Content.overlay.verifyOverlay.heading[3]}
            </div>
          </div>

          <div className='verify-again'>
            <div className='verify-ask'>{Content.overlay.verifyOverlay.resend.question}</div>
            {resendStatus === '' && (
              <button
                className={`send-new-email-btn`}
                onClick={handleButtonClick}
              >
                {Content.overlay.verifyOverlay.resend.prompt}
              </button>
            )}
            {resendStatus === 'disabled' && (
              <button
                className={`send-new-email-btn disabled`}
                onClick={handleButtonClick}
              >
                {Content.overlay.verifyOverlay.resend.prompt}
              </button>
            )}
            {resendStatus === 'limited' && (
              <button
                className={`send-new-email-btn disabled`}
                onClick={handleButtonClick}
              >
                {Content.overlay.verifyOverlay.resend.prompt}
              </button>
            )}
            {resendStatus === '' && (
              <div className='verify-status'>
                
              </div>
            )}
            {resendStatus === 'disabled' && (
              <div className='verify-status'>
                {Content.overlay.verifyOverlay.resend.sent}
              </div>
            )}
            {resendStatus === 'limited' && (
              <div className='verify-status error'>
                {Content.overlay.verifyOverlay.resend.tooMany}
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

export default VerifyEmailOverlay;