import cron from 'node-cron';
import { GameController } from '../api/GamesController';
import { PredictionController } from '../api/PredictionController';

export function initCron() {
  const cronTimezone = 'America/New_York';

  cron.schedule('0,15,30,45 20-23 * * *', GameController.updateGamesInDatabase, {
    timezone: cronTimezone,
  });

  cron.schedule('0,15,30 0-1 * * *', GameController.updateGamesInDatabase, {
    timezone: cronTimezone,
  });

  cron.schedule('15,30 1 * * *', PredictionController.updatePredictionsInDatabase, {
    timezone: cronTimezone,
  });

  cron.schedule('5 12 * * *', GameController.fetchAndStoreGamesToday, {
    timezone: cronTimezone,
  });
}

//
