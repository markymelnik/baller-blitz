import { useNavigate } from 'react-router-dom';

import './user-result.scss';
import { UserProfileInfo } from '../../../../types/userTypes';

type UserResultProps = {
	user: UserProfileInfo;
}

export const UserResult = ({ user }: UserResultProps) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/profile/${user.username}`)
	}

	return (
    <li key={user.id} className='user-result' onClick={handleClick}>
      <div className='user-username'>{user.username}</div>
      <div className='user-email'>{user.email}</div>
    </li>
  );
}
