import { useEffect, useState } from "react";
import { ring } from "ldrs";

import { useUserSeach } from "../../../../hooks/user/useUserSearch";
import './user-search.scss';
import { UserResult } from "../UserResult/UserResult";
import { Icons } from "../../../../lib/Icons";
import { useSearch } from "../../../useSearch";
import { UserProfileInfo } from "../../../../types/userTypes";

export const UserSearch = () => {
  ring.register();

  const { searchQuery, setSearchQuery } = useSearch();
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [page, setPage] = useState<number>(1);
  const [areResultsLoading, setAreResultingLoading] = useState<boolean>(false);
  const pageSize = 10;
  
  const {
    data,
    isLoading,
    isError,
  } = useUserSeach(debouncedQuery, page, pageSize);

  const users = data ?? [];

  useEffect(() => {
    setAreResultingLoading(true);
    const timer = setTimeout(() => {
        setDebouncedQuery(searchQuery);
        setAreResultingLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
      setAreResultingLoading(false);
    }
}, [searchQuery]);

  const showSpinner = areResultsLoading || isLoading;

  return (
    <div className='user-search-container'>
      <input
        type='text'
        placeholder='Search users...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='user-search-searchbar'
      />
      {showSpinner && (
        <div className='user-search-error'>
          <l-ring
            size='25'
            stroke='3'
            bg-opacity='0'
            speed='2'
            color='black'
          ></l-ring>
        </div>
      )}
      {isError && (
        <div className='user-search-error'>
          <div className='error-message'>Error fetching users</div>
        </div>
      )}
      {users && !showSpinner && (
        <>
          {users.length < 1 && <div className='search-fallback'>No Results</div>}
          <ul className='list-of-users'>
            {users.map((user: UserProfileInfo) => (
              <UserResult key={user.id} user={user} />
            ))}
          </ul>
        </>
      )}
      <div className='pagination-controls'>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          <Icons.ArrowLeft size={20} />
        </button>
        <span>{page}</span>
        <button onClick={() => setPage(page + 1)}>
          <Icons.ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};