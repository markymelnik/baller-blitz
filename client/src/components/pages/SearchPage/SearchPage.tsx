import { UserSearch } from './UserSearch/UserSearch';
import './search-page.scss';

const SearchPage = () => {
  return (
    <main className='search-page main-page'>
      <h2 className="sp-title">Search for users!</h2>
      <UserSearch />
    </main>
  );
};

export default SearchPage;
