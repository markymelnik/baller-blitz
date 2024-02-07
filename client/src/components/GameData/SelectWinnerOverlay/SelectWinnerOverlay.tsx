import { MouseEvent, MouseEventHandler, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconX } from '@tabler/icons-react';

import { useOutsideClick } from '../../../hooks/useOutsideClick.ts';
import { useDisableBodyScroll } from '../../../hooks/useDisableBodyScroll.ts';
import { Game } from '../../../types/gameTypes.ts';

import { SelectOverlayState } from './PickSubmitButton/SelectOverlayState.ts';
import { PickSubmitButton } from './PickSubmitButton/PickSubmitButton.tsx';
import { PickTeamButton } from './PickTeamButton/PickTeamButton.tsx';
import './select-winner-overlay.scss';

type SelectWinnerOverlayProps = {
	isOpen: boolean;
	onClose: () => void;
	game: Game;
}

export const SelectWinnerOverlay = ({ isOpen, onClose, game }: SelectWinnerOverlayProps) => {
	const overlayRef = useRef(null);
  const buttonRef = useRef(null);
  
  const [overlayState, setOverlayState] = useState<string>(SelectOverlayState.SELECT);
  const [selectedWinner, setSelectedWinner] = useState<string>('');

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

  const submiSelectedtWinner = () => {
    console.log(selectedWinner);
    // API CALL HERE
    handleOverlayResetAndClose();
  }

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

  return createPortal(
    <div className='portal-wrapper'>
      <div className='select-winner-overlay' ref={overlayRef} onClick={handleOverlayClick}>
        <button className='overlay-close-btn' onClick={(e) => { e.stopPropagation(); handleOverlayResetAndClose(); }}>
          <IconX size={30} stroke={1.25} />
        </button>

        <div className="overlay-top">
          <div className='game-info'>Game Id: {game.gameId}</div>
        </div>

        <div className="overlay-mid">
          <div className='game-matchup'>
            <PickTeamButton team="away" teamDetails={game.awayTeam} teamTricode={game.awayTeam.teamTricode} selectWinner={() => selectWinner(game.awayTeam.teamTricode)} selectedWinner={selectedWinner} overlayState={overlayState} />
            <PickTeamButton team="home" teamDetails={game.homeTeam} teamTricode={game.homeTeam.teamTricode} selectWinner={() => selectWinner(game.homeTeam.teamTricode)} selectedWinner={selectedWinner} overlayState={overlayState} />
          </div>
          <div className="game-message">{overlayState !== SelectOverlayState.SELECT ? `Your pick: ${selectedWinner}` : `Choose one`}</div>
        </div>
        
        <div className="overlay-bot">
          <div className="game-submit-warning">
            {overlayState === SelectOverlayState.SUBMIT ? 'Are you sure?' : ''}
          </div>
          <div className='game-prompt'>
            {overlayState === SelectOverlayState.SELECT && (
              <PickSubmitButton
                onClick={() => {}}
                state={SelectOverlayState.SELECT}
              >
                Select Winner
              </PickSubmitButton>
            )}
            {overlayState === SelectOverlayState.CONFIRM && (
              <PickSubmitButton
                onClick={actionWrapper(confirmSelectedWinner)}
                state={SelectOverlayState.CONFIRM}
              >
                Confirm
              </PickSubmitButton>
            )}
            {overlayState === SelectOverlayState.SUBMIT && (
              <PickSubmitButton
              ref={buttonRef}
                onClick={actionWrapper(submiSelectedtWinner)}
                state={SelectOverlayState.SUBMIT}
              >
                Submit
              </PickSubmitButton>
            )}
          </div>
        </div>
        
      </div>
    </div>,
    document.getElementById('portal-root')!
  );
};
