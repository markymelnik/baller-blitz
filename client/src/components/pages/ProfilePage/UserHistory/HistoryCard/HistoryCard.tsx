import { PredictedGame } from '../../../../../types/gameTypes';
import { GameDataFormatter } from '../../../../../utils/GameDataFormatter';
import './history_card.scss';

type HistoryCard = {
	gameInfo: PredictedGame;
}
export const HistoryCard = ({ gameInfo }: HistoryCard) => {
	const { game_date, predicted_winner, is_correct, away_team, home_team } = {...gameInfo};

	return (
		<li className={`history-card ${is_correct ? `correct` : `incorrect`}`}>
			<div className="history-game-id">{`${GameDataFormatter.formatDate(game_date)}`}</div>
			<div className="history-game-matchup">{away_team} vs. {home_team}</div>
			<div className="history-game-choice">You chose: {predicted_winner}</div>
			<div className="history-user-decision">{`Status: ${is_correct ? `Correct` : `Incorrect`}`}</div>
		</li>
	)
}