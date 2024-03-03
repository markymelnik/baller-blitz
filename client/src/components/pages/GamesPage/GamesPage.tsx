/* import { Content } from '../../../lib/Content.ts'; */

import { ListOfGamesToday } from './ListOfGamesToday/ListOfGamesToday.tsx';
import './games-page.scss';

const GamesPage = () => {
  return (
    <main className='games-page main-page'>
      {/* <h1 className='games-page-header'>{Content.games.title}</h1> */}
        <ListOfGamesToday />
      <div className='games-page-bot'>
      </div>
    </main>
  );
};

export default GamesPage;
