import cron from 'node-cron';
import { GameController } from '../../api/games/GamesController';
import { PredictionController } from '../../api/prediction/PredictionController';

export function initCron() {
  cron.schedule('0,15,30,45 20-23 * * *', GameController.updateGamesInDatabase);
  cron.schedule('0,15,30 0-1 * * *', GameController.updateGamesInDatabase);
  cron.schedule('15,30 1 * * *', PredictionController.updatePredictionsInDatabase);
  cron.schedule('5 12 * * *', GameController.fetchAndStoreGamesToday);

  cron.schedule('45 13 * * *', GameController.updateGamesInDatabase);
  cron.schedule('46 13 * * *', PredictionController.updatePredictionsInDatabase);
  cron.schedule('47 13 * * *', GameController.fetchAndStoreGamesToday);
}
