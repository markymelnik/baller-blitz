import { useEffect, useState } from "react"

import { PredictionManager } from "../PredictionManager.ts";
import { CurrentPredictionObject } from "../types/userTypes.ts";

import { useAccessToken, useGamesToday, useUserDetails } from "./stateSelectors.ts"

export const useGetCurrentPredictions = () => {

	const userDetails = useUserDetails();
	const gamesToday = useGamesToday();
	const accessToken = useAccessToken();

	const [currentlyPredictedGames, setCurrentlyPredictedGames] = useState<CurrentPredictionObject[]>([]);

	useEffect(() => {
		if (gamesToday.length > 0 && userDetails && accessToken) {
			const userId = userDetails.id;
			const gameIds = gamesToday.map(game => +game.gameId);

			const fetchPredictions = async () => {
				try {
					const currentPredictions: CurrentPredictionObject[] = await PredictionManager.fetchCurrentPredictions(userId, gameIds);
					setCurrentlyPredictedGames(currentPredictions);
				} catch (error) {
					console.error(error);
				}
			}
			fetchPredictions();
		}
	}, [userDetails, gamesToday, accessToken]);

	return currentlyPredictedGames;
}