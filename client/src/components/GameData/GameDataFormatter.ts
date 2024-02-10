import { Game } from "../../types/gameTypes.ts";

import { GameState } from "./GameState.ts";

export const GameDataFormatter = {
  determineStatus(gameStatus: number): string {
    if (gameStatus === 1) {
      return GameState.NOT_STARTED;
    }
    if (gameStatus === 2) {
      return GameState.IN_PROGRESS;
    }
    if (gameStatus === 3) {
      return GameState.FINISHED;
    }
    return GameState.ERROR;
  },

  determineWinner(game: Game): string {
    const { awayTeam, homeTeam } = game;
    let output = '';

    if (awayTeam.score > homeTeam.score) {
      output += awayTeam.teamName;
    } else if (awayTeam.score < homeTeam.score) {
      output += homeTeam.teamName;
    } else {
      return 'Tied';
    }
    return output += ` by ${Math.abs(awayTeam.score - homeTeam.score)}`;
  },

  formatDate(date: string): string {
    date = date.slice(0, 10);
    const parts = date.split('-');
    
    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[parseInt(parts[1], 10)];

    const day = parseInt(parts[2], 10).toString();

    /* const year = parts[0].slice(2); */

    const formattedDate = `${month} ${day}`
    return formattedDate;
  },

  formatTimeToEST(timeString: string): string {
    timeString = timeString.slice(11, 16);
    const [hours, minutes] = timeString.split(':').map(Number);

    let newHours = (hours - 5 + 24) % 24;

    newHours = newHours % 12;
    newHours = newHours === 0 ? 12 : newHours;

    let formattedHours = newHours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    if (formattedHours[0] === '0') {
      formattedHours = formattedHours.slice(1);
    }

    return `${formattedHours}:${formattedMinutes} PM EST`;
  },
};
