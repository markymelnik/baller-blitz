import { useState } from 'react';

import { Icons } from '../../../lib/Icons';
import { Content } from '../../../lib/Content';
import { LogoutButton } from '../../buttons/LogoutButton/LogoutButton';

import { SeeEmail } from './SeeEmail/SeeEmail';
import { UpdateUsername } from './UpdateUsername/UpdateUsername';
import './settings-page.scss';

const SettingsPage = () => {

	const [isUsernameUpdateOpen, setIsUsernameUpdateOpen] = useState<boolean>(false);
	const [isSeeEmailOpen, setIsSeeEmailOpen] = useState<boolean>(false);

	const handleUUClick = () => {
		setIsUsernameUpdateOpen(prev => !prev);
	};

	const handleSEClick = () => {
		setIsSeeEmailOpen(prev => !prev);
	}

	return (
    <main className='settings-page main-page'>
      <ul className='sp-settings-list'>
        <li className='sp-settings-item'>
            <button className="sp-open-btn" onClick={handleSEClick}>
              <h2 className="sp-btn-text">{Content.auth.email.title}</h2>
              <Icons.ArrowDown size ={16} className={
                  isSeeEmailOpen ? `sp-btn-icon email` : `sp-rotate-icon`
                }/>
            </button>
            {isSeeEmailOpen && (
              <div className="see-email-wrapper">
                <SeeEmail />
              </div>
            )}
        </li>
        <li className='sp-settings-item'>
            <button className='sp-open-btn' onClick={handleUUClick}>
              <h2 className='sp-btn-text'>{Content.auth.username.title}</h2>
              <Icons.ArrowDown
                size={16}
                className={
                  isUsernameUpdateOpen ? `sp-btn-icon` : `sp-rotate-icon`
                }
              />
            </button>
            {isUsernameUpdateOpen && (
              <div className='update-username-wrapper'>
                <UpdateUsername />
              </div>
            )}
        </li>
      </ul>
      <LogoutButton />
    </main>
  );
}

export default SettingsPage;