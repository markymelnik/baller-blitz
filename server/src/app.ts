import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { signupUser } from './api/controllers/signupUser';
import { loginUser } from './api/controllers/loginUser';
import { validateToken } from './api/middleware/validateToken';

const FRONTEND_URL = process.env.FRONTEND_URL;
const FRONTEND_PORT = process.env.FRONTEND_PORT;
const BACKEND_PORT = process.env.BACKEND_PORT;

const app = express();

app.use(express.json());
app.use(cors({ origin: `${FRONTEND_URL}:${FRONTEND_PORT}`}))

app.get('/', (req, res) => {
  res.send('NBA Battle');
});

app.get('/profile', validateToken, (req, res) => {
  res.json({ message: 'You have hit a protected route' });
});

app.post('/signup', signupUser);

app.post('/login', loginUser);

app.listen(`${BACKEND_PORT}`, () => {
  console.log(`Server listening at ${BACKEND_PORT}`);
});

export default app;
