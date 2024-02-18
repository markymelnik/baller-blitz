import './user-result.scss';

type UserResultProps = {
	user: any;
}

export const UserResult = ({ user }: UserResultProps) => {
	
	return (
		<li key={user.id} className='user-result'>
		<div className="user-username">{user.username}</div>
		<div className="user-email">{user.email}</div>
	</li>
	)
}