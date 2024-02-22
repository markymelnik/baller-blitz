import { ListOfGamesToday } from './ListOfGamesToday/ListOfGamesToday.tsx';
import './games-page.scss';

export const GamesPage = () => {
  return (
    <div className='games-page'>
      <div className='games-page-header'>Games</div>
        <ListOfGamesToday />
      <div className='games-page-bot'>
      </div>
    </div>
  );
};
