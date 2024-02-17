import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { LoginCredentials } from '../../../types/authTypes.ts';
import { AuthManager } from '../../../managers/AuthManager.ts';
import { AuthenticationError } from '../../../errors/ErrorClasses.ts';
import { handleError } from '../../../errors/handleError.ts';
import { ValidationErrorMessage } from '../InputValidation/ValidationErrorMessage/ValidationErrorMessage.tsx';
import { useDelayNavigate } from '../../../hooks/page/useDelayNavigate.ts';
import { Content } from '../../../lib/Content.ts';
import './login-form.scss';
import { Icons } from '../../../lib/Icons.ts';


export const LoginForm = () => {
  const dispatch = useDispatch();
  const delayNavigate = useDelayNavigate();

  const [emailChecked, setEmailChecked] = useState<boolean>(false);
  const [emailExists, setEmailExists] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  console.log(emailChecked, emailExists);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
    watch
  } = useForm<LoginCredentials>();

  const currentEmail = watch('email') || '';

  const handleEmailSubmit = async (formData: { email: string }) => {
    try {
      const response = await AuthManager.checkIfEmailExists(formData.email);
      console.log(response);

      setEmailChecked(true);

      if (response.error) {
        if (response.error.message === 'This email format does not work. Try again.') {
          setError('email', { type: 'custom', message: 'Email is not valid' });
          setEmailExists(false);
          setEmailChecked(false);
        } else if (response.error === 'Email already in use') {
          setEmailExists(true);
        }
      }
      
      else {
        
        setEmailExists(true);
      }

    } catch (error) {
      handleError(error);
    }
  }

  const handleLoginFormSubmit = async (formData: LoginCredentials) => {
    try {
      const response = await AuthManager.loginUser(formData, dispatch);
      console.log(response);
      if (!response) {
        throw new AuthenticationError('No response received from login process');
      }

      if (response.error && response.error.code) {
        setError('email', { type: 'custom', message: response.error.message });
      }

      if (response.user) {
        delayNavigate('/');
      }

    } catch (error) {
      const loginError = new AuthenticationError('Failed to login');
      handleError(loginError);
    }
  };

  const handleEditButtonClick = () => {
    setEmailChecked(false);
    setEmailExists(false);
    clearErrors();
    reset({
      email: currentEmail,
      password: ''
    });
  }

  return (
    <form
      onSubmit={
        emailChecked && emailExists
          ? handleSubmit(handleLoginFormSubmit)
          : handleSubmit(handleEmailSubmit)
      }
      className='login-form'
    >
      <div className='login-form-top'>
        <div className='login-form-heading'>
          {emailExists ? 'Enter your password' : 'Welcome back'}
        </div>
      </div>

      <div className='login-input-fields'>
        <Controller
          name='email'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <div className='login-email-field floating-label'>
              <input
                type='email'
                placeholder=' '
                autoComplete='current-email'
                {...field}
                disabled={emailChecked && emailExists}
              />
              <label htmlFor='email'>{Content.auth.email.title}</label>
              {emailChecked && emailExists && (
                <div className='edit-email-btn' onClick={handleEditButtonClick}>
                  Edit
                </div>
              )}
            </div>
          )}
        />

        {emailChecked && emailExists && (
          <Controller
            name='password'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <div className='login-password-field floating-label'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder=' '
                  autoComplete='current-password'
                  {...field}
                  maxLength={20}
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors('email');
                  }}
                />
                <label htmlFor='password'>{Content.auth.password.title}</label>
                <button className='show-login-pw-btn' onClick={() => setShowPassword(prev => !prev)}>
                  {showPassword ? <Icons.EyeOpen size={20} /> : <Icons.EyeClose size={20} />}
                </button>
              </div>
            )}
          />
        )}
      </div>
      <ValidationErrorMessage error={errors.email?.message || ''} />
      <button className='login-submit-btn' type='submit'>
        {emailChecked && emailExists ? Content.auth.login.title : 'Continue'}
      </button>
    </form>
  );
};
