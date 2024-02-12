import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { AuthController } from './api/auth/AuthController';
import { corsOptions } from './config/corsConfig';
import { TokenController } from './api/token/TokenController';
import { ErrorHandler } from './middleware/error-handler';
import { loginLimiter, signupLimiter } from './middleware/rate-limiting';
import { errorConfig } from './config/errorConfig';
import { GameController } from './api/games/GamesController';
import { PredictionController } from './api/prediction/PredictionController';
import { initCron } from './database/jobs/cronJobs';
import 'dotenv/config';
import { verifyEmailHandler } from './utils/auth/verifyEmailHandler';

const BACKEND_PORT = process.env.BACKEND_PORT;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

initCron();

app.get('/', (req, res) => {
  res.send('NBA Battle');
});

app.post('/signup', signupLimiter, AuthController.signupUserHandler);
app.post('/login', loginLimiter, AuthController.loginUserHandler);
app.post('/logout', AuthController.logoutUserHandler);
app.post('/refresh-token', TokenController.refreshAccessToken);

app.get('/profile', TokenController.validateAccessToken, (req, res) => {
  res.json({ message: 'You have hit a protected route' });
});

app.get('/games', TokenController.validateAccessToken, GameController.getAllGames);
app.post('/games', TokenController.validateAccessToken, GameController.addGame);
app.get('/games/:id', TokenController.validateAccessToken, GameController.getGameById);
app.patch('/games/:id', TokenController.validateAccessToken, GameController.updateGame);

app.get('/predictions', TokenController.validateAccessToken, PredictionController.getAllUserPredictionsByUserId);
app.post('/predictions', TokenController.validateAccessToken, PredictionController.makePrediction);
app.get('/predictions/current', TokenController.validateAccessToken, PredictionController.getCurrentUserPredictions);
app.get('/predictions/stats', TokenController.validateAccessToken, PredictionController.getUserPredictionStats);

app.get('/verify', verifyEmailHandler);

app.use(ErrorHandler(errorConfig));

app.listen(`${BACKEND_PORT}`, () => {
  console.log(`Server listening at ${BACKEND_PORT}`);
});

export default app;
