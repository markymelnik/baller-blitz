import { useEffect, useState } from "react"

import { PredictionManager } from "../../managers/PredictionManager.ts";
import { CurrentPredictionObject } from "../../types/userTypes.ts";
import { useAccessToken, useGamesToday } from "../stateSelectors.ts"

export const useFetchCurrentPredictions = () => {

	const gamesToday = useGamesToday();
	const accessToken = useAccessToken();

	const [currentlyPredictedGames, setCurrentlyPredictedGames] = useState<CurrentPredictionObject[]>([]);

	useEffect(() => {
		if (gamesToday.length > 0 && accessToken) {
			const gameIds = gamesToday.map(game => +game.gameId);

			const fetchPredictions = async () => {
				try {
					const currentPredictions: CurrentPredictionObject[] = await PredictionManager.getCurrentPredictions(accessToken, gameIds);
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