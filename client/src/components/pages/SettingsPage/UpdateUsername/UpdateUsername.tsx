import { ChangeEvent, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

import { useAccessToken, useUserDetails } from '../../../../hooks/stateSelectors';
import { UserDetails } from '../../../../types/userTypes';
import { ApiClient } from '../../../../api/ApiClient';
import { setUserDetails } from '../../../../redux/slices/userSlice';
import './update-username.scss';

export const UpdateUsername = () => {
  const dispatch = useDispatch();

  const userDetails = useUserDetails()!;
  const accessToken = useAccessToken();

  const { username } = userDetails;

  const [currentUsername, setCurrentUsername] = useState<string>(username);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);
	const [usernameError, setUsernameError] = useState<string>('Type in a new username.');
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
		
		if (currentUsername.trim() === '') {
			setUsernameError('Username cannot be empty');
			setIsButtonActive(false);
		}

		else if (currentUsername.length < 4 || currentUsername.length > 16) {
      setUsernameError('Username must be between 4 and 16 characters');
      setIsButtonActive(false);
    }

		else if (!/^[a-zA-Z0-9]+$/.test(currentUsername)) {
			setUsernameError('Username can only contain letters and numbers');
			setIsButtonActive(false);
		}

		else if (currentUsername === username) {
			setUsernameError('Type in a new username');
			setIsButtonActive(false);
		}

		else {
			setUsernameError('Update username');
			setIsButtonActive(true);
		}
    /*  else if (currentUsername.trim() === '') {
      
			setIsButtonActive(false);
    } else {
      currentUsername !== username && currentUsername.trim() !== '';
			setIsButtonActive(false);
    } */
  }, [currentUsername, username]);

  const mutation = useMutation(ApiClient.updateUsername, {
    onSuccess: (data) => {
      const updatedUserDetails: UserDetails = {
        ...userDetails,
        username: data.updatedUsername,
        id: userDetails.id,
        email: userDetails.email,
        role: userDetails.role,
        is_verified: userDetails.is_verified,
      };
      dispatch(setUserDetails(updatedUserDetails));
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000) 
    },
    onError: () => {
      console.error('Error updating username somewhere');
    },
  });

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentUsername(event.target.value);
  };

  const handleSubmit = () => {
    if (isButtonActive) {
      mutation.mutate({ newUsername: currentUsername, accessToken });
    }
  };

  return (
    <div className='settings-field'>
      <div className='settings-field-top'>
        <div className='settings-field-name'>Username</div>
        <input
					id='new-username'
          type='text'
          value={currentUsername}
          onChange={handleUsernameChange}
          className='new-username-input'
					maxLength={16}
        />
        <button
          onClick={handleSubmit}
          disabled={!isButtonActive}
          className={`save-username-btn ${isButtonActive ? 'active' : ''}`}
        >
          Update
        </button>
      </div>
      <div className='settings-field-bot'>
        {success ? (<div className="settings-field-message">Success! Username updated!</div>) : (<div className="settings-field-message">{usernameError}</div>)}
				
			</div>
    </div>
  );
}