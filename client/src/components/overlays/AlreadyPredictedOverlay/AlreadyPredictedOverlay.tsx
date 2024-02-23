import { MouseEvent, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Content } from '../../../lib/Content.ts';
import { useOutsideClick } from '../../../hooks/page/useOutsideClick.ts';
import { useDisableBodyScroll } from '../../../hooks/page/useDisableBodyScroll.ts';
/* import { OverlayOKButton } from '../OKButton/OverlayOkButton.tsx'; */
import { OverlayCloseButton } from '../OverlayCloseButton/OverlayCloseButton.tsx';
import { Game } from '../../../types/gameTypes.ts';
import { PredictionManager } from '../../../managers/PredictionManager.ts';
import { useAccessToken, useUserDetails } from '../../../hooks/stateSelectors.ts';
import { OverlayOKButton } from '../OKButton/OverlayOkButton.tsx';

import { AlreadyOverlayState } from './AlreadyOverlayState.ts';
import './already-predicted-overlay.scss';

type AlreadyPredictedOverlayProps = {
	isOpen: boolean;
	onClose: () => void;
	game: Game;
	predictedWinner: string | undefined;
	onSuccessfulSubmission: () => void;
}

export const AlreadyPredictedOverlay = ({ isOpen, onClose, game, predictedWinner, onSuccessfulSubmission }: AlreadyPredictedOverlayProps) => {
	const overlayRef = useRef(null);

	const accessToken = useAccessToken();

	const [overlayState, setOverlayState] = useState<string>(AlreadyOverlayState.CONFIRM);

	const otherTeam = predictedWinner === game.awayTeam.teamTricode ? game.homeTeam.teamTricode : game.awayTeam.teamTricode;

	const userDetails = useUserDetails();
	const userId = userDetails?.id;

	const gameId = game.gameId;

	const handleOverlayClose = () => {
		onClose();
	}

	const confirmWinner = () => {
		setOverlayState(AlreadyOverlayState.SUBMIT);
	}

	const submitWinner = async () => {
		try {

			if (!accessToken) {
				throw new Error('Access token is null');
			}

			if (userId === undefined) {
				throw new Error('User ID is undefined');
			}

			await PredictionManager.updatePrediction(accessToken, {
				user_id: userId,
        game_id: +gameId,
        predicted_winner: otherTeam,
			})
			
			setOverlayState(AlreadyOverlayState.RESULT);
			onSuccessfulSubmission();

		} catch (error) {
			console.error(error);
		}
	}

	const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
		if (event.target === overlayRef.current) {
			if (overlayState === AlreadyOverlayState.SUBMIT) {
				setOverlayState(AlreadyOverlayState.CONFIRM)
			}
		}
	}

	const handleOverlayResetAndClose = () => {
		setOverlayState(AlreadyOverlayState.CONFIRM);
		onClose();
	}

	useOutsideClick(overlayRef, handleOverlayResetAndClose);
  useDisableBodyScroll(isOpen);

	if (!isOpen) return null;

	if (overlayState === AlreadyOverlayState.RESULT) {
		const message = 'Success! Your prediction was updated.';
    return createPortal(
      <div className="portal-wrapper">
        <div className="already-predicted-overlay success" ref={overlayRef} onClick={handleOverlayClick}>
          <OverlayCloseButton onClose={handleOverlayResetAndClose}/>
          <div className="already-pred-success-message">{message}</div>
          <OverlayOKButton onClose={handleOverlayResetAndClose}/>
        </div>
      </div>,
      document.getElementById('portal-root')!
    )
	}

	return createPortal(
		<div className="ap-portal-wrapper">
			<div className="already-predicted-overlay" ref={overlayRef} onClick={handleOverlayClick} role="dialog">
				<OverlayCloseButton onClose={handleOverlayClose} />
				<div className="already-predicted-overlay-message">{`You chose ${predictedWinner}!`}</div>
				<div className="switch-prediction">
					<div className="switch-pred-text">{`Switch to ${otherTeam} instead?`}</div>
					<div className='already-submit-warning'>
            {overlayState === AlreadyOverlayState.SUBMIT ? `Are you sure?` : ''}
          </div>
					{overlayState === AlreadyOverlayState.CONFIRM && <button className='switch-submit-btn' onClick={confirmWinner}>{Content.overlay.alreadyPredicted.state[1]}</button>}
					{overlayState === AlreadyOverlayState.SUBMIT && <button className={`switch-submit-btn submit`} onClick={submitWinner}>{Content.overlay.alreadyPredicted.state[2]}</button>}
				</div>
			</div>
		</div>,
		document.getElementById('portal-root')!
	)
}