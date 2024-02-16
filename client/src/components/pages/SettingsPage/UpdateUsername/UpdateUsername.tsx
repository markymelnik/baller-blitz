import { ChangeEvent, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

import { useAccessToken, useUserDetails } from '../../../../hooks/stateSelectors';
import { UserDetails } from '../../../../types/userTypes';
import { ApiClient } from '../../../../api/ApiClient';
import { setUserDetails } from '../../../../redux/slices/userSlice';
import './update-username.scss';
import { Icons } from '../../../../lib/Icons';

export const UpdateUsername = () => {
  const dispatch = useDispatch();

  const userDetails = useUserDetails()!;
  const accessToken = useAccessToken();

  const { username } = userDetails;

  const [currentUsername, setCurrentUsername] = useState<string>(username);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const lowercaseCurrentUsername = currentUsername.toLowerCase();

    if (currentUsername.trim() === '') {
      setUsernameError('Cannot be empty');
      setIsButtonActive(false);
    } else if (currentUsername.length < 4 || currentUsername.length > 16) {
      setUsernameError('Must be between 4 and 16 characters');
      setIsButtonActive(false);
    } else if (!/^[a-zA-Z0-9]+$/.test(currentUsername)) {
      setUsernameError('Can contain only letters and numbers');
      setIsButtonActive(false);
    } else if (lowercaseCurrentUsername === username.toLowerCase()) {
      setUsernameError('');
      setIsButtonActive(false);
    } else {
      setUsernameError('');
      setIsButtonActive(true);
    }
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
      }, 2000);
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
    <div className='update-username'>
      <div className='uu-title'>Edit username</div>
      <div className='uu-top'>
        <input
          id='update-username'
          type='text'
          value={currentUsername}
          onChange={handleUsernameChange}
          className='uu-input'
          maxLength={20}
        />
        <button
          onClick={handleSubmit}
          className={`update-username-btn ${isButtonActive ? '' : 'inactive'}`}
        >
          Update
        </button>
      </div>
      <div className='uu-bot'>
        {success ? (
          <div className='uu-message'>Success! Username updated!</div>
        ) : (
          <div className='uu-message'>
            {usernameError && (
              <span className='uu-error-icon'>
                <Icons.SheildWarning size={16} />
              </span>
            )}

            {usernameError}
          </div>
        )}
      </div>
    </div>
  );
};