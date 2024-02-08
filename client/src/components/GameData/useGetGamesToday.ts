import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setGamesToday } from "../../redux/slices/gamesTodaySlice.ts";
import { Game } from "../../types/gameTypes.ts";
import { ENV } from "../../env.ts";

export const useGetGamesToday = () => {

	const dispatch = useDispatch();

	useEffect(() => {
    const fetchData = async () => {
			try {
				const response = await fetch(ENV.DATA_PATH);
				
				if (!response.ok) {
					console.log('Error occurred');
					return;
				}

				const data = await response.json();

				const todaysGames: Game[] = data.scoreboard.games; // Ensure this works

				dispatch(setGamesToday(todaysGames));
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
		
  }, [dispatch]);
}