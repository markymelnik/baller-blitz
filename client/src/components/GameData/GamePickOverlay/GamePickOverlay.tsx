import { useRef } from 'react';
import { createPortal } from 'react-dom';

import './game-pick-overlay.scss';
import { Game } from '../../../types/gameTypes.ts';
import { useOutsideClick } from '../../../hooks/useOutsideClick.ts';

type GamePickOverlayProps = {
	isOpen: boolean;
	onClose: () => void;
	game: Game;
}

export const GamePickOverlay = ({ isOpen, onClose, game }: GamePickOverlayProps) => {
	const overlayRef = useRef(null);
	useOutsideClick(overlayRef, onClose);

	if (!isOpen) return null;

  return createPortal(
		<div className="portal-wrapper">
			<div className='game-pick-overlay' ref={overlayRef}>
      <button className='overlay-close-btn' onClick={onClose}>
        X
      </button>
      <div className='game-info'>Game Id: {game.gameId}</div>
      <div className='game-matchup'>
        <div className='away-team'>
          <div className='tricode'>{game.awayTeam.teamTricode}</div>
          <div className='score'>{game.awayTeam.score}</div>
        </div>
        <div className='home-team'>
          <div className='tricode'>{game.homeTeam.teamTricode} </div>{' '}
          <div className='score'>{game.homeTeam.score} </div>
        </div>
      </div>
      <div className='game-prompt'>Select Winner</div>
    </div>
		</div>
    ,
    document.getElementById('portal-root')!
  );
};
