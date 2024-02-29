import { useEffect, useState } from "react";
import { ring } from "ldrs";

import { useUserSeach } from "../../../../hooks/user/useUserSearch";
import { UserResult } from "../UserResult/UserResult";
import { useSearch } from "../../../../contexts/useSearch";
import { usePagination } from "../../../../contexts/usePagination";
import { UserProfileInfo } from "../../../../types/userTypes";
import { useUserDetails } from "../../../../hooks/stateSelectors";
import { Content } from "../../../../lib/Content";
import { Icons } from "../../../../lib/Icons";

import { PaginationBar } from "./PaginationBar/PaginationBar";
import './user-search.scss';

export const UserSearch = () => {
  ring.register();
  const userDetails = useUserDetails();

  const { searchQuery, setSearchQuery } = useSearch();
  const { page, setPage } = usePagination();
  const pageSize = 10;
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [areResultsLoading, setAreResultingLoading] = useState<boolean>(false);

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
}, [searchQuery, page]);

  const { data, isLoading, isError } = useUserSeach(debouncedQuery, page, pageSize);
  
  const clientId = userDetails?.id;

  const dataUsers = data?.users ?? [];
  const users = dataUsers.filter(user => user.id !== clientId) ?? [];

  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const showSpinner = areResultsLoading || isLoading;

  return (
    <div className='user-search-container'>
      <div className="user-search-top">
        <div className="searchbar-icon">
          <Icons.Search size={18} />
        </div>
      <input
        type='text'
        placeholder='Search users...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='user-search-searchbar'
        name='user-search'
      />
      </div>
      
      {showSpinner && (
        <div className='user-search-spinner'>
          <l-ring
            size='25'
            stroke='3'
            bg-opacity='0'
            speed='2'
            color='var(--spinner-color)'
          ></l-ring>
        </div>
      )}
      {isError && (
        <div className='user-search-error'>
          <div className='error-message'>{Content.search.error}</div>
        </div>
      )}
      {users && !showSpinner && (
        <>
          {users.length < 1 && <div className='search-fallback'>{Content.search.noResults}</div>}
          <ul className='list-of-users'>
            {users.map((user: UserProfileInfo) => (
              <UserResult key={user.id} user={user} />
            ))}
          </ul>
          {totalCount > 0 && <PaginationBar setPage={setPage} page={page} totalPages={totalPages}/> }
        </>
      )}
      
    </div>
  );
};