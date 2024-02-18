import { useState } from "react";

import { useUserSeach } from "../hooks/user/useUserSearch";
import './user-search.scss';

export const UserSearch = () => {
  const [query, setQuery] = useState<string>('');
  const { data: users, isLoading, isError } = useUserSeach(query);

  return (
    <div className='user-search-container'>
      <input
        type='text'
        placeholder='Search users...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
			{isLoading && <div>Is Loading...</div>}
			{isError && <div>Error fetching users</div>}
			{users && (
				<ul className="list-of-users">
					{users.map((user) => (
						<li key={user.id} className="user-result">{user.email}</li>
					))}
				</ul>
			)}
    </div>
  );
};