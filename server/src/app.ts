import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { AuthController } from './api/AuthController';
import { corsOptions } from './config/corsConfig';
import { TokenController } from './api/token/TokenController';
import { ErrorHandler } from './middleware/error-handler';
import { loginLimiter, resendVerifyEmailLimiter, signupLimiter } from './middleware/rate-limiting';
import { errorConfig } from './config/errorConfig';
import { GameController } from './api/GamesController';
import { PredictionController } from './api/PredictionController';
import { initCron } from './jobs/cronJobs';
import { initWebSocketServer } from './initWebSocket';
import { UserController } from './api/UserController';
import 'dotenv/config';
import { FriendController } from './api/FriendController';

const BACKEND_PORT = process.env.BACKEND_PORT;

const app = express();
app.set('trust proxy', 1);

const server = http.createServer(app);

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

initCron();
initWebSocketServer(server);

app.get('/', (req, res) => {
  res.send('NBA Battle');
});

app.post('/signup', signupLimiter, AuthController.signupUserHandler);
app.post('/login', loginLimiter, AuthController.loginUserHandler);
app.post('/logout', AuthController.logoutUserHandler);

app.post('/refresh-token', TokenController.refreshAccessToken);

app.post('/check-email', AuthController.emailCheckHandler);

app.get('/profile', TokenController.validateAccessToken, (req, res) => {
  res.json({ message: 'You have hit a protected route' });
});

app.get('/live-games', /* TokenController.validateAccessToken,  */GameController.getLiveGameData);

app.get('/games', TokenController.validateAccessToken, GameController.getAllGames);
app.post('/games', TokenController.validateAccessToken, GameController.addGame);
app.get('/games/:id', TokenController.validateAccessToken, GameController.getGameById);
app.patch('/games/:id', TokenController.validateAccessToken, GameController.updateGame);

app.get('/predictions', TokenController.validateAccessToken, PredictionController.getAllUserPredictionsByUserId);
app.post('/predictions', TokenController.validateAccessToken, PredictionController.makePrediction);
app.patch('/predictions', TokenController.validateAccessToken, PredictionController.updatePrediction);
app.get('/predictions/current', TokenController.validateAccessToken, PredictionController.getCurrentUserPredictions);
app.get('/predictions/stats', TokenController.validateAccessToken, PredictionController.getUserPredictionStats);

app.get('/verify', resendVerifyEmailLimiter, TokenController.validateAccessToken, AuthController.resendEmailVerificationHandler);
app.get('/verify-email', AuthController.verifyEmailHandler);

app.get('/users/search', TokenController.validateAccessToken, UserController.searchAllUsers);
app.get('/profile/:username', TokenController.validateAccessToken, UserController.getUserPublicProfile);

app.post('/update-username', TokenController.validateAccessToken, UserController.updateUsername);

app.post('/friends/request', TokenController.validateAccessToken, FriendController.createFriendRequest);
app.post('/friends/accept/:requestId', TokenController.validateAccessToken, FriendController.acceptFriendRequest);
app.post('/friends/reject/:requestId', TokenController.validateAccessToken, FriendController.rejectFriendRequest);

app.get('/friends/requests', TokenController.validateAccessToken, FriendController.getIncomingFriendRequestsByUserId);
app.get('/friends/pending', TokenController.validateAccessToken, FriendController.getOutgoingFriendRequestsByUserId);
app.get('/friends/status', TokenController.validateAccessToken, FriendController.getFriendRequestStatus);
app.get('/friends', TokenController.validateAccessToken, FriendController.getAllFriendsByUserId);
app.delete('/friends', TokenController.validateAccessToken, FriendController.deleteFriend);

app.use(ErrorHandler(errorConfig));

server.listen(`${BACKEND_PORT}`, () => {
  console.log(`Server listening at ${BACKEND_PORT}`);
});

export default app;
