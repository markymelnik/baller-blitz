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
import 'dotenv/config';
import { PredictionController } from './api/prediction/PredictionController';

const BACKEND_PORT = process.env.BACKEND_PORT;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('NBA Battle');
});
app.post('/signup', signupLimiter, AuthController.signupUser);
app.post('/login', loginLimiter, AuthController.loginUser);
app.post('/logout', AuthController.logoutUser);
app.post('/refresh-token', TokenController.refreshAccessToken);

app.get('/profile', TokenController.validateAccessToken, (req, res) => {
  res.json({ message: 'You have hit a protected route' });
});

app.get('/games', GameController.getGames)
app.get('/games/:id', GameController.getGameById);
app.post('/games', GameController.addGame);
app.patch('/games/:id', GameController.updateGame);

app.post('/predictions/new', PredictionController.makePrediction);
app.get('/predictions/user/:id', PredictionController.getUserPredictionsByUserId);

app.use(ErrorHandler(errorConfig));

app.listen(`${BACKEND_PORT}`, () => {
  console.log(`Server listening at ${BACKEND_PORT}`);
});

export default app;
