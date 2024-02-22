import { FriendsList } from '../../friends/FriendsList/FriendsList';
import { RequestingFriends } from '../../friends/RequestingFriends/Notifications';
import './friends-page.scss';

export const FriendsPage = () => {

	return (
		<div className="friends-page">
		<FriendsList />
		<RequestingFriends />
	</div>
	)
}