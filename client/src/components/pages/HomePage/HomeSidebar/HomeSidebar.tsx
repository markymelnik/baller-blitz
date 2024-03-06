import { LogoutButton } from '../../../buttons/LogoutButton/LogoutButton';
import { NavToProfileBtn } from '../../../buttons/nav/NavToProfileBtn';
import './home-sidebar.scss';

type HomeSidebarProps = {
  activeTab: string;
	setActiveTab: (tab: string) => void;
};

export const HomeSidebar = ({ activeTab, setActiveTab }: HomeSidebarProps) => {

	return (
		<div className="home-sidebar">
			<nav className="sidebar-nav">
				<li className={`sidebar-item ${activeTab === 'dashboard' ? `on` : ``}`} onClick={() => setActiveTab('dashboard')}>Dashboard</li>
				<li className={`sidebar-item ${activeTab === 'games' ? `on` : ``}`} onClick={() => setActiveTab('games')}>Games</li>
				<li className={`sidebar-item ${activeTab === 'friends' ? `on` : ``}`} onClick={() => setActiveTab('friends')}>Friends</li>
			</nav>
			<div className="sidebar-space"></div>
			<nav className="sidebar-to-profile-nav">
			<NavToProfileBtn />
			</nav>
		
			<div className="sidebar-divider"><div className="divider"></div></div>
			<LogoutButton />
		</div>
	)
}