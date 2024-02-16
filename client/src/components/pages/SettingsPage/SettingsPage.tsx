import { UpdateUsername } from './UpdateUsername/UpdateUsername';
import './settings-page.scss';

export const SettingsPage = () => {

	return (
		<div className="settings-page">
			<div className="settings-page-header">Settings</div>
			<UpdateUsername />
		</div>
	)
}