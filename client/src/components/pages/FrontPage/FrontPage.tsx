import { LogoutButton } from '../../buttons/LogoutButton/LogoutButton.tsx';
import { ListOfGamesToday } from '../../GameData/ListOfGamesToday/ListOfGamesToday.tsx';
import './front-page.scss';

export const FrontPage = () => {
  return (
    <div className='front-page'>
      <div className='front-page-header'>Games</div>
        <ListOfGamesToday />
      <div className='front-page-bot'>
        <LogoutButton />
      </div>
    </div>
  );
};
