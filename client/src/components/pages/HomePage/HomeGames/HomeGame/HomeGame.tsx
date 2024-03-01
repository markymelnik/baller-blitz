import { useState } from 'react';

import { GameDataFormatter } from '../../../../../utils/GameDataFormatter';
import AlreadyPredictedOverlay from '../../../../overlays/AlreadyPredictedOverlay/AlreadyPredictedOverlay';
import './home-game.scss';
import { Game } from '../../../../../types/gameTypes';

type HomeGameProps = {
	game: Game;
  predictedWinner: string | undefined;
  onSuccessfulSubmission: () => void;
}

export const HomeGame = ({ game, predictedWinner, onSuccessfulSubmission }: HomeGameProps) => {

	const [isAlreadyPredictedOverlayOpen, setIsAlreadyPredictedOverlayOpen] = useState<boolean>(false);

	const handleGameClick = () => {
		setIsAlreadyPredictedOverlayOpen(true);
	};
	
	console.log(game);

	return (
		<>
		<li className="home-game" onClick={handleGameClick}>
			<div className="hg-date">{GameDataFormatter.formatDate(game.gameTimeUTC)}</div>
			<div className="hg-matchup">
				<div className="hg-away-team">
					<div className="team-tricode">{game.awayTeam.teamTricode}</div>
				</div>
				<div className="hg-home-team">
					<div className="team-tricode">{game.homeTeam.teamTricode}</div>
				</div>
			</div>
			<div className="hg-prediction">
				You predicted: {predictedWinner}
			</div>
		</li>
		<AlreadyPredictedOverlay
			isOpen={isAlreadyPredictedOverlayOpen}
			onClose={() => setIsAlreadyPredictedOverlayOpen(false)}
			game={game}
			predictedWinner={predictedWinner}
			onSuccessfulSubmission={onSuccessfulSubmission}
		/>
	</>
	)
}