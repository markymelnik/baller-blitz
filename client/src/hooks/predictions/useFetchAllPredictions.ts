import { useEffect, useState } from "react";

import { PredictionManager } from "../../managers/PredictionManager";
import { PredictedGame } from "../../types/gameTypes";
import { useAccessToken } from "../stateSelectors";

export const useFetchAllPredictions = () => {

	const accessToken = useAccessToken();

	if (!accessToken) {
		throw new Error('unexpected token issue')
	}

	const [allPredictedGames, setAllPredictedGames] = useState<PredictedGame[]>([]);

	useEffect(() => {
		const fetchAllPredictions = async() => {
			try {
				const response: PredictedGame[] = await PredictionManager.fetchAllPredictions(accessToken);
				setAllPredictedGames(response);
			} catch (error) {
				console.error(error);
			}
		}

		fetchAllPredictions();
	}, [accessToken]);

	return allPredictedGames;
}