export function determineWinner(game: any) {
  return game.awayTeam.score > game.homeTeam.score
    ? game.awayTeam.Tricode
    : game.homeTeam.Tricode;
}
