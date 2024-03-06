import { ColorBtn } from '../../../buttons/ColorBtn/ColorBtn';
import { LogoutButton } from '../../../buttons/LogoutButton/LogoutButton';
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
			</nav>
			<ColorBtn />
			<LogoutButton />
		</div>
	)
}