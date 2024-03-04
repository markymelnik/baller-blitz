import { useEffect } from "react";
import { useDispatch } from "react-redux";

/* import { setGamesToday } from "../../redux/slices/gamesTodaySlice.ts";
import { Game } from "../../types/gameTypes.ts"; */
import { ENV } from "../../env.ts";

export const useFetchGamesToday = (trigger: boolean) => {

	const dispatch = useDispatch();

	useEffect(() => {
    const fetchData = async () => {
			try {
				const response = await fetch(ENV.DATA_PATH);
				
				if (!response.ok) {
					console.log(`Error occurred: ${response.status}`);
					return;
				}

				const responseText = await response.text();

		
				
				console.log(responseText);
				/* console.log(data);

				const todaysGames: Game[] = data.scoreboard.games; // Ensure this works
				console.log(todaysGames);

				dispatch(setGamesToday(todaysGames)); */
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
		
  }, [dispatch, trigger]);
}