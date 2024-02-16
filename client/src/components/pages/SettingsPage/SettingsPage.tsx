import { useState } from 'react';

import { Icons } from '../../../lib/Icons';

import { UpdateUsername } from './UpdateUsername/UpdateUsername';
import './settings-page.scss';
import { SeeEmail } from './SeeEmail/SeeEmail';

export const SettingsPage = () => {

	const [isUsernameUpdateOpen, setIsUsernameUpdateOpen] = useState<boolean>(false);
	const [isSeeEmailOpen, setIsSeeEmailOpen] = useState<boolean>(false);

	const handleUUClick = () => {
		setIsUsernameUpdateOpen(prev => !prev);
	};

	const handleSEClick = () => {
		setIsSeeEmailOpen(prev => !prev);
	}

	return (
    <div className='settings-page'>
      <ul className='sp-settings-list'>
			<li className='sp-settings-item'>
					<button className="sp-open-btn" onClick={handleSEClick}>
						<div className="sp-btn-text">Email</div>
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
            <div className='sp-btn-text'>Username</div>
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
    </div>
  );
}