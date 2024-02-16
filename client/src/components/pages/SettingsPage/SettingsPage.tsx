import { useEffect, useState } from 'react';

import { useUserDetails } from '../../../hooks/stateSelectors';
import './settings-page.scss';

export const SettingsPage = () => {

	const userDetails = useUserDetails();

	const { username } = userDetails!;

	const [currentUsername, setCurrentUsername] = useState<string>(username);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);

  useEffect(() => {
    setIsButtonActive(
      currentUsername !== username && currentUsername.trim() !== ''
    );
  }, [currentUsername, username]);

  const handleUsernameChange = (event) => {
    setCurrentUsername(event.target.value);
  };

	const handleSubmit = () => {
		if (isButtonActive) {
			console.log('Submitting new username:', currentUsername);
		}
	}

	if (!userDetails) {
		return <div>Loading...</div>
	}

	return (
		<div className="settings-page">
			<div className="settings-page-header">Settings</div>
			<div className="settings-field">
				<div className="settings-field-name">Username</div>
				<input type="text" value={currentUsername} onChange={handleUsernameChange} />
				<button onClick={handleSubmit} disabled={!isButtonActive} className={`save-username-btn ${isButtonActive ? 'active' : ''}`}>Update</button>
			</div>
		</div>
	)
}