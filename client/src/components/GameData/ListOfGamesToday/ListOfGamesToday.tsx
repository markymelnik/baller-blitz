import { useSelector } from "react-redux";

import { RootState } from "../../../redux/store.ts";
import { GameCard } from "../GameCard/GameCard.tsx";
import { Game } from "../../../types/gameTypes.ts";
import './list-of-games-today.scss';

export const ListOfGamesToday = () => {
  const todaysGames = useSelector((state: RootState) => state.gamesToday.games);

  if (!todaysGames) {
    return null;
  }

  return (
    <ul className='list-of-games-today'>
      {todaysGames.map((game: Game) => (
        <GameCard game={game} key={game.gameId} />
      ))}
    </ul>
  );
};