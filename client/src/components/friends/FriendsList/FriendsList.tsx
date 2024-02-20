import { useAccessToken } from '../../../hooks/stateSelectors';
import { useFriends } from '../hooks/useFriends';
import './friends-list.scss';

export const FriendsList = () => {

	const accessToken = useAccessToken()!;

	const { data: friends, isLoading } = useFriends(accessToken);

	if (isLoading) {
		return <div>loading...</div>
	}

	console.log(friends);
	return (
	
		<div className="friends-list">

		</div>
	
	)
}