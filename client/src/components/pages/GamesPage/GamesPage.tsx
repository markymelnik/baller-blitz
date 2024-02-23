import { ListOfGamesToday } from './ListOfGamesToday/ListOfGamesToday.tsx';
import './games-page.scss';

export const GamesPage = () => {
  return (
    <main className='games-page'>
      <h1 className='games-page-header'>Games</h1>
        <ListOfGamesToday />
      <div className='games-page-bot'>
      </div>
    </main>
  );
};
