import { Game } from "../types/gameTypes.ts";

export const GameDataFormatter = {
  determineStatus(game: Game): string {
    const currentTime = new Date();
    const startTime = new Date(game.gameTimeUTC);

    if (currentTime < startTime) {
      return 'Not Started';
    }

    if (currentTime >= startTime) {
      return 'In Progress';
    }

    if (game.gameStatusText.includes('Finish')) {
      return 'Finished';
    }
    return 'Error';
  },

  determineWinner(game: Game): string {
    if (!game.gameStatusText.includes('Final')) return 'TBD';
    const { awayTeam, homeTeam } = game;

    if (awayTeam.score > homeTeam.score) {
      return awayTeam.teamName;
    } else return homeTeam.teamName;
  },

  formatDate(date: string): string {
    date = date.slice(0, 10);
    const parts = date.split('-');
    const formattedDate = parts[1] + '-' + parts[2] + '-' + parts[0];
    return formattedDate;
  },

  formatTimeToEST(timeString: string): string {
    timeString = timeString.slice(11, 16);
    const [hours, minutes] = timeString.split(':').map(Number);

    const newHours = hours - 5 + 24 - (12 % 24);

    let formattedHours = newHours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    if (formattedHours[0] === '0') {
      formattedHours = formattedHours.slice(1);
    }

    return `${formattedHours}:${formattedMinutes} PM`;
  },
};
