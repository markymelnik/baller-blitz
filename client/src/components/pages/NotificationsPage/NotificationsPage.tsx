import { RequestingFriends } from './RequestingFriends/RequestingFriends';
import './notif-page.scss';

export const NotificationsPage = () => {
	return (
		<main className="notifications-page">
			<RequestingFriends />
		</main>
	)
}