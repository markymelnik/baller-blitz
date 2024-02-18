import { useEffect, useState } from "react";

import { UserStatistics } from "../../types/userTypes";
import { PredictionManager } from "../../managers/PredictionManager";
import { useAccessToken } from "../stateSelectors";

export const useFetchUserStats = () => {

	const accessToken = useAccessToken();

	if (!accessToken) {
		throw new Error('unexpected token issue')
	}

	const [statistics, setStatistics] = useState<UserStatistics>();

	useEffect(() => {
		const fetchStatistics = async () => {
			try {
				const response: UserStatistics = await PredictionManager.getUserStats(accessToken);
				setStatistics(response);
			} catch (error) {
				console.error(error);
			}
		}
		fetchStatistics();
	}, [accessToken]);

	return statistics;
}