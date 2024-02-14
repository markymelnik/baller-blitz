import { useEffect, useState } from "react"

import { PredictionManager } from "../../managers/PredictionManager.ts";
import { useAccessToken, useGamesToday } from "../stateSelectors.ts"
import { CurrentPredictedGame } from "../../types/gameTypes.ts";

export const useFetchCurrentPredictions = () => {

	const gamesToday = useGamesToday();
	const accessToken = useAccessToken();

	const [currentlyPredictedGames, setCurrentlyPredictedGames] = useState<CurrentPredictedGame[]>([]);

	useEffect(() => {
		if (gamesToday.length > 0 && accessToken) {
			const gameIds = gamesToday.map(game => +game.gameId);

			const fetchPredictions = async () => {
				try {
					const currentPredictions: CurrentPredictedGame[] = await PredictionManager.getCurrentPredictions(accessToken, gameIds);
					setCurrentlyPredictedGames(currentPredictions);
				} catch (error) {
					console.error(error);
				}
			}
			fetchPredictions();
		}
	}, [gamesToday, accessToken]);

	return currentlyPredictedGames;
}