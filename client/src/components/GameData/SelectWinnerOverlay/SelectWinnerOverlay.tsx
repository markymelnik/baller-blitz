import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useOutsideClick } from '../../../hooks/useOutsideClick.ts';
import { Game } from '../../../types/gameTypes.ts';

import { SelectOverlayState } from './PickSubmitButton/SelectOverlayState.ts';
import { PickSubmitButton } from './PickSubmitButton/PickSubmitButton.tsx';
import './select-winner-overlay.scss';

type SelectWinnerOverlayProps = {
	isOpen: boolean;
	onClose: () => void;
	game: Game;
}

export const SelectWinnerOverlay = ({ isOpen, onClose, game }: SelectWinnerOverlayProps) => {
	const overlayRef = useRef(null);
  

  const [buttonState, setButtonState] = useState<string>(SelectOverlayState.SELECT_WINNER);
  const [selectedTeam, setSelectedWinner] = useState<string>('');

  const selectWinner = (team: 'away' | 'home') => {
    const newSelectedTeam = team === 'home' ? game.homeTeam.teamTricode : game.awayTeam.teamTricode;
    setSelectedWinner(newSelectedTeam);
    setButtonState(SelectOverlayState.CONFIRM);
  }

  const confirmSelection = () => {
    setButtonState(SelectOverlayState.SUBMIT);
  }

  const submiSelectedtWinner = () => {
    console.log(selectedTeam);
    resetProgress();
  }

  const resetProgress = () => {
    setButtonState(SelectOverlayState.SELECT_WINNER);
    setSelectedWinner('');
    onClose();
  }

  /* const getButtonClassName = (state: string, baseClass: string) => {
    if (game)
		switch(state) {
			case SelectOverlayState.CONFIRM:
				return `${baseClass} confirm`;
			case SelectOverlayState.SUBMIT:
				return `${baseClass} submit`;
			default:
				return `${baseClass} select-winner`;
		}
	} */

  useOutsideClick(overlayRef, resetProgress);

	if (!isOpen) return null;

  return createPortal(
    <div className='portal-wrapper'>
      <div className='select-winner-overlay' ref={overlayRef}>
        <button className='overlay-close-btn' onClick={resetProgress}>
          X
        </button>
        <div className='game-info'>Game Id: {game.gameId}</div>
        <div className='game-matchup'>
          <div className={`away-team ${selectedTeam === game.awayTeam.teamTricode ? `confirm` : ``}`} onClick={() => selectWinner('away')}>
            <div className='tricode'>{game.awayTeam.teamTricode}</div>
          </div>
          <div className={`home-team ${selectedTeam === game.homeTeam.teamTricode ? `confirm` : ``}`} onClick={() => selectWinner('home')}>
            <div className='tricode'>{game.homeTeam.teamTricode} </div>{' '}
          </div>
        </div>
        <div className="game-message">Current selection: {selectedTeam} </div>
        <div className='game-prompt'>
          {buttonState === SelectOverlayState.SELECT_WINNER && (
            <PickSubmitButton
              onClick={() => {}}
              state={SelectOverlayState.SELECT_WINNER}
            >
              Select Winner
            </PickSubmitButton>
          )}
          {buttonState === SelectOverlayState.CONFIRM && (
            <PickSubmitButton
              onClick={confirmSelection}
              state={SelectOverlayState.CONFIRM}
            >
              Confirm
            </PickSubmitButton>
          )}
          {buttonState === SelectOverlayState.SUBMIT && (
            <PickSubmitButton
              onClick={submiSelectedtWinner}
              state={SelectOverlayState.SUBMIT}
            >
              Submit
            </PickSubmitButton>
          )}
        </div>
      </div>
    </div>,
    document.getElementById('portal-root')!
  );
};
