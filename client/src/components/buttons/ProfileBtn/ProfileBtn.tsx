import { useRef, useState } from 'react';

import { useOutsideClick } from '../../../hooks/page/useOutsideClick';
import { NavToProfileBtn } from '../nav/NavToProfileBtn';
import { NavToSettingsBtn } from '../nav/NavToSettingsBtn';
import { useUserDetails } from '../../../hooks/stateSelectors';
import './profile-btn.scss';
import { ColorBtn } from '../ColorBtn/ColorBtn';

export const ProfileBtn = () => {
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

	const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);

  useOutsideClick(dropdownRef, closeDropdown);

	const userDetails = useUserDetails()!;
  const { username } = userDetails;
  const letter = username.slice(0,1).toUpperCase();

  return (
    <div className='profile-dropdown-container' ref={dropdownRef}>
      <button
        className='profile-btn'
        onClick={() => (isDropdownOpen ? closeDropdown() : openDropdown())}
      >
        {letter}
      </button>

        <div className={`dropdown ${isDropdownOpen ? `open` : ``}`}>
          <NavToProfileBtn /> 
          <NavToSettingsBtn />
          <ColorBtn />
        </div>
  
    </div>
  );
};