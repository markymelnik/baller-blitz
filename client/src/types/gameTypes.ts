export interface AwayTeam {
	score: number;
	teamCity: string;
	teamName: string;
	teamTricode: string;
}

export interface HomeTeam {
	score: number;
	teamCity: string;
	teamName: string;
	teamTricode: string;
}

export interface Game {
	gameId: string;
	gameCode: string;
	gameEt: string;
	gameTimeUTC: string;
	gameStatus: number;
	awayTeam: AwayTeam;
	homeTeam: HomeTeam;
	gameStatusText: string;
	period: string;
}