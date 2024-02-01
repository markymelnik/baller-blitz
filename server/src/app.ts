import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { signupUser } from './api/controllers/signupUser';
import { loginUser } from './api/controllers/loginUser';
import { validateToken } from './api/middleware/validateToken';
import cookieParser from 'cookie-parser';
import { logoutUser } from './api/controllers/logoutUser';
import { confirmAuthentication } from './api/confirmAuthentication';
import { corsOptions } from './cors';

const BACKEND_PORT = process.env.BACKEND_PORT;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('NBA Battle');
});

app.get('/profile', validateToken, (req, res) => {
  res.json({ message: 'You have hit a protected route' });
});

app.post('/signup', signupUser);

app.post('/login', loginUser);

app.post('/logout', logoutUser);

app.post('/confirm-auth', confirmAuthentication);

app.listen(`${BACKEND_PORT}`, () => {
  console.log(`Server listening at ${BACKEND_PORT}`);
});

export default app;
