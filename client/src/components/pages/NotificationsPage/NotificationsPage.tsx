import { RequestingFriends } from './RequestingFriends/RequestingFriends';
import './notif-page.scss';

const NotificationsPage = () => {
	return (
		<main className="notifications-page">
			<RequestingFriends />
		</main>
	)
}

export default NotificationsPage;