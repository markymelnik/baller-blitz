import { MouseEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconX } from '@tabler/icons-react';

import { useOutsideClick } from '../../../hooks/useOutsideClick.ts';
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

  useEffect(() => {
    console.log(overlayState, selectedWinner);
  }, [overlayState, selectedWinner]);

  const selectWinner = (teamTricode: string) => {
    setSelectedWinner(teamTricode);
    setOverlayState(SelectOverlayState.CONFIRM);
  }

  const confirmSelectedWinner = () => {
    setOverlayState(SelectOverlayState.SUBMIT);
  }

  const submiSelectedtWinner = () => {
    console.log(selectedWinner);
    handleOverlayResetAndClose();
  }

  const handleOverlayResetAndClose = () => {
    resetOverlayState();
    setSelectedWinner('');
    onClose();
  }

  const resetOverlayState = () => {
    setOverlayState(SelectOverlayState.SELECT);
  }

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === overlayRef.current) {
      if (overlayState === SelectOverlayState.SUBMIT) {
        setOverlayState(SelectOverlayState.CONFIRM);
      } else if (overlayState === SelectOverlayState.CONFIRM) {
        setOverlayState(SelectOverlayState.SELECT);
        console.log('clicked inside overlay')
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
            <PickTeamButton team="away" teamTricode={game.awayTeam.teamTricode} selectWinner={() => selectWinner(game.awayTeam.teamTricode)} selectedWinner={selectedWinner} overlayState={overlayState} />
            <PickTeamButton team="home" teamTricode={game.homeTeam.teamTricode} selectWinner={() => selectWinner(game.homeTeam.teamTricode)} selectedWinner={selectedWinner} overlayState={overlayState} />
          </div>
          <div className="game-message">Current selection: {selectedWinner} </div>
        </div>
        
        <div className="overlay-bot">
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
