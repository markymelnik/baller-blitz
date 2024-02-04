import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { AuthController } from './api/auth/AuthController';
import { corsOptions } from './config/corsConfig';
import { TokenController } from './api/token/TokenController';
import { ErrorHandler } from './middleware/error-handler';
import { AuthenticationError, DuplicateEmailError, IncorrectEmailFormatError, ValidationError } from './errors/ErrorClasses';
import 'dotenv/config';
import { loginLimiter, signupLimiter } from './middleware/rate-limiting';
import { errorConfiguration } from './errors/errorConfiguration';

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

app.use(ErrorHandler(errorConfiguration));

app.listen(`${BACKEND_PORT}`, () => {
  console.log(`Server listening at ${BACKEND_PORT}`);
});

export default app;
