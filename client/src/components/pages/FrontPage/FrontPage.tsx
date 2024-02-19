import { Content } from '../../../lib/Content.ts';

import { ListOfGamesToday } from './ListOfGamesToday/ListOfGamesToday.tsx';
import './front-page.scss';

export const FrontPage = () => {
  return (
    <div className='front-page'>
      <div className='front-page-header'>{Content.front.games.title}</div>
        <ListOfGamesToday />
      <div className='front-page-bot'>
      </div>
    </div>
  );
};
