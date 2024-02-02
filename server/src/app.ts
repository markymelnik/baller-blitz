import express from 'express';
import cors from 'cors';
import { validateAccessToken } from './utils/validateAccessToken';
import cookieParser from 'cookie-parser';
import { AuthController } from './api/controllers/AuthController';
import { corsOptions } from './config/corsConfig';
import { TokenController } from './api/controllers/TokenController';
import 'dotenv/config';
import { ErrorHandler } from './middleware/error-handler';
import { ValidationError } from './errors/ErrorClasses';

const BACKEND_PORT = process.env.BACKEND_PORT;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('NBA Battle');
});
app.post('/signup', AuthController.signupUser);
app.post('/login', AuthController.loginUser);
app.post('/logout', AuthController.logoutUser);
app.post('/refresh-token', TokenController.refreshToken);
app.get('/profile', validateAccessToken, (req, res) => {
  res.json({ message: 'You have hit a protected route' });
});

app.use(ErrorHandler([
  {
    type: ValidationError,
    statusCode: 400,
    errorCode: 'validation_error',
    errorMessage: 'Bad Request; your request contains invalid data'
  },
]))

app.listen(`${BACKEND_PORT}`, () => {
  console.log(`Server listening at ${BACKEND_PORT}`);
});

export default app;
