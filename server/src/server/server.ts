import express from 'express';
import { insertUser } from '../database/insertUser';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('NBA Battle');
});

app.post('/signup', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const newUser = await insertUser(email, username, password);
    res.status(200).json(newUser);
  } catch (err) {
    console.error('Error signing up user', err);
    res.status(500).json({ message: 'Error signing up user' });
  }
})

const port = 4000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

export default app;
