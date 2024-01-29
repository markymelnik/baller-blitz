import express from 'express';
import { signupUser } from './api/controllers/signupUser';
import { loginUser } from './api/controllers/loginUser';
import { validateToken } from './api/middleware/validateToken';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('NBA Battle');
});

app.get('/profile', validateToken, (req, res) => {
  res.json({ message: 'You have hit a protected route' });
});

app.post('/signup', signupUser);

app.post('/login', loginUser);

const port = 4000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

export default app;
