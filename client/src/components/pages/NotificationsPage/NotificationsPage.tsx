import { RequestingFriends } from './RequestingFriends/RequestingFriends';
import './notif-page.scss';

export const NotificationsPage = () => {
	return (
		<div className="notifications-page">
			<RequestingFriends />
		</div>
	)
}