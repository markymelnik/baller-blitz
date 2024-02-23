import { MouseEvent, MouseEventHandler, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Content } from '../../../lib/Content.ts';
import { useOutsideClick } from '../../../hooks/page/useOutsideClick.ts';
import { useDisableBodyScroll } from '../../../hooks/page/useDisableBodyScroll.ts';
import { Game } from '../../../types/gameTypes.ts';
import { PredictionManager } from '../../../managers/PredictionManager.ts';
import { useAccessToken, useUserDetails } from '../../../hooks/stateSelectors.ts';
import { OverlayCloseButton } from '../OverlayCloseButton/OverlayCloseButton.tsx';
import { OverlayOKButton } from '../OKButton/OverlayOkButton.tsx';

import { SelectOverlayState } from './SelectOverlayState.ts';
import { PickTeamButton } from './PickTeamButton/PickTeamButton.tsx';
import { PickSubmitButton } from './PickSubmitButton/PickSubmitButton.tsx';
import './select-winner-overlay.scss';

type SelectWinnerOverlayProps = {
	isOpen: boolean;
	onClose: () => void;
	game: Game;
  onSuccessfulSubmission: () => void;
}

const SelectWinnerOverlay = ({ isOpen, onClose, game, onSuccessfulSubmission }: SelectWinnerOverlayProps) => {
	const overlayRef = useRef(null);
  const buttonRef = useRef(null);

  const accessToken = useAccessToken()!;
  
  const [overlayState, setOverlayState] = useState<string>(SelectOverlayState.SELECT);
  const [selectedWinner, setSelectedWinner] = useState<string>('');
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState<boolean>(false);

  const userDetails = useUserDetails()!;
  const userId = userDetails.id;

  const gameId = parseInt(game.gameId);

  const selectWinner = (teamTricode: string) => {
    setSelectedWinner(teamTricode);
    setOverlayState(SelectOverlayState.CONFIRM);
  }

  const confirmSelectedWinner = () => {
    setOverlayState(SelectOverlayState.SUBMIT);
  }

  const resetOverlayState = () => {
    setOverlayState(SelectOverlayState.SELECT);
  }

  const submiSelectedtWinner = async() => {
    try {
      const response = await PredictionManager.makePrediction(accessToken, {
        user_id: userId,
        game_id: gameId,
        predicted_winner: selectedWinner,
      });

      if (response.error) {
        setIsSubmissionSuccessful(false);
        setOverlayState(SelectOverlayState.RESULT);
      } else {
        setIsSubmissionSuccessful(true);
        setOverlayState(SelectOverlayState.RESULT);
        onSuccessfulSubmission();
      }
    } catch (error) {
      console.error('Error submitting user');
    }
  };

  const handleOverlayResetAndClose = () => {
    resetOverlayState();
    setSelectedWinner('');
    onClose();
  }

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === overlayRef.current) {
      if (overlayState === SelectOverlayState.SUBMIT) {
        setOverlayState(SelectOverlayState.CONFIRM);
      } else if (overlayState === SelectOverlayState.CONFIRM) {
        setOverlayState(SelectOverlayState.SELECT);
      }
    }
  }

  const actionWrapper = (action: () => void): MouseEventHandler<HTMLButtonElement> => {
    return (event) => {
      event.stopPropagation();
      action();
    }
  }

  useOutsideClick(overlayRef, handleOverlayResetAndClose);
  useDisableBodyScroll(isOpen);

	if (!isOpen) return null;

  if (overlayState === SelectOverlayState.RESULT) {
    const message = isSubmissionSuccessful ? Content.overlay.selectWinner.submit.success : Content.overlay.selectWinner.submit.failure;
    return createPortal(
      <div className="sw-portal-wrapper">
        <div className="select-winner-overlay success" ref={overlayRef} onClick={handleOverlayClick}>
          <OverlayCloseButton onClose={handleOverlayResetAndClose}/>
          <div className="select-overlay-message">{message}</div>
          <OverlayOKButton onClose={handleOverlayResetAndClose}/>
        </div>
      </div>,
      document.getElementById('portal-root')!
    )
  }

  return createPortal(
    <div className='sw-portal-wrapper'>
      <div
        className='select-winner-overlay'
        ref={overlayRef}
        onClick={handleOverlayClick}
        role="dialog"
      >
        <OverlayCloseButton onClose={handleOverlayResetAndClose} />
        <div className='overlay-top'>
          <div className='overlay-title'>{Content.overlay.selectWinner.prompt}</div>
        </div>
        <div className='overlay-mid'>
          <div className='game-matchup'>
            <PickTeamButton
              team='away'
              teamDetails={game.awayTeam}
              teamTricode={game.awayTeam.teamTricode}
              selectWinner={() => selectWinner(game.awayTeam.teamTricode)}
              selectedWinner={selectedWinner}
              overlayState={overlayState}
            />
            <PickTeamButton
              team='home'
              teamDetails={game.homeTeam}
              teamTricode={game.homeTeam.teamTricode}
              selectWinner={() => selectWinner(game.homeTeam.teamTricode)}
              selectedWinner={selectedWinner}
              overlayState={overlayState}
            />
          </div>
          <div className='game-message'>
            {overlayState !== SelectOverlayState.SELECT
              ? `Your pick: ${selectedWinner}`
              : ``}
          </div>
        </div>
        <div className='overlay-bot'>
          <div className='game-submit-warning'>
            {overlayState === SelectOverlayState.SUBMIT ? 'Are you sure?' : ''}
          </div>
          <div className='game-prompt'>
            {overlayState === SelectOverlayState.SELECT && (
              <PickSubmitButton
                onClick={() => {}}
                state={SelectOverlayState.SELECT}
              >
                {Content.overlay.selectWinner.state[1]}
              </PickSubmitButton>
            )}
            {overlayState === SelectOverlayState.CONFIRM && (
              <PickSubmitButton
                onClick={actionWrapper(confirmSelectedWinner)}
                state={SelectOverlayState.CONFIRM}
              >
                {Content.overlay.selectWinner.state[2]}
              </PickSubmitButton>
            )}
            {overlayState === SelectOverlayState.SUBMIT && (
              <PickSubmitButton
                ref={buttonRef}
                onClick={actionWrapper(submiSelectedtWinner)}
                state={SelectOverlayState.SUBMIT}
              >
              {Content.overlay.selectWinner.state[3]}
              </PickSubmitButton>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('portal-root')!
  );
};

export default SelectWinnerOverlay;
