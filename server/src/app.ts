import express from 'express';
import { signupUser } from './api/controllers/signupUser';
import { loginUser } from './api/controllers/loginUser';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('NBA Battle');
});

app.post('/signup', signupUser);

app.post('/login', loginUser);

const port = 4000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

export default app;
