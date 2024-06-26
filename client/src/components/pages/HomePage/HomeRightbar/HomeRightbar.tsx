import { UserStats } from '../../ProfilePage/UserStats/UserStats';
import './home-rightbar.scss';

export const HomeRightbar = () => {
	return (
		<div className="home-rightbar">
			<div className="home-rb-top">
				<UserStats />
			</div>
			<div className="home-rb-bot"></div>
		</div>
	)
}