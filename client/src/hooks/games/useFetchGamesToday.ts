import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setGamesToday } from "../../redux/slices/gamesTodaySlice.ts";
import { Game } from "../../types/gameTypes.ts";
import { createBackendEndpointUrl } from "../../utils/createBackendEndpointUrl.ts";
import { createBackendEndpointUrl } from "../../utils/createBackendEndpointUrl.ts";

export const useFetchGamesToday = (trigger: boolean) => {

	const dispatch = useDispatch();

	useEffect(() => {
    const fetchData = async () => {
			try {
				const BACKEND_ENDPOINT = createBackendEndpointUrl('/live-games');
				const response = await fetch(`${BACKEND_ENDPOINT}`);
				console.log(response);
				
				if (!response.ok) {
					console.log(`Error occurred: ${response.status}`);
					return;
				}

				const todaysGames: Game[] = await response.json();
				console.log(todaysGames);

				dispatch(setGamesToday(todaysGames));
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
		
  }, [dispatch, trigger]);
}