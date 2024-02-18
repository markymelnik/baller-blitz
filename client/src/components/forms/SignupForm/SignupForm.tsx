import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { SignupCredentials } from '../../../types/authTypes.ts';
import { AuthManager } from '../../../managers/AuthManager.ts';
import { AuthenticationError } from '../../../errors/ErrorClasses.ts';
import { handleError } from '../../../errors/handleError.ts';
import { SignupValidation } from '../InputValidation/SignupValidation/SignupValidation.tsx';
import { ValError } from '../InputValidation/ValError/ValError.tsx';
import { useDelayNavigate } from '../../../hooks/page/useDelayNavigate.ts';
import { Content } from '../../../lib/Content.ts';
import './signup-form.scss';
import { Icons } from '../../../lib/Icons.ts';

export const SignupForm = () => {
  const dispatch = useDispatch();
  const delayNavigate = useDelayNavigate();

  const [emailChecked, setEmailChecked] = useState<boolean>(false);
  const [emailExists, setEmailExists] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm<SignupCredentials>();

  const currentEmail = watch('email') || '';
  const currentPassword = watch('password') || '';

  const handleEmailSubmit = async (formData: { email: string }) => {
    try {
      const response = await AuthManager.checkIfEmailExists(formData.email);

      setEmailChecked(true);

      if (response.error) {
        if (response.error === 'Email already in use') {
          setError('email', { type: 'custom', message: 'Email unavailable' });
          setEmailExists(true);
        } else if (response.error.message === 'This email format does not work. Try again.') {
          setError('email', { type: 'custom', message: 'Email is not valid' });
          setEmailExists(false);
          setEmailChecked(false);
        }
      }

      else if (response.emailExists === false) {
        setEmailExists(false);
      }


    } catch (error) {
      const signupError = new AuthenticationError('Failed to submit email');
      handleError(signupError);
    }
  }

  const handleSignupFormSubmit = async (formData: SignupCredentials) => {
    try {
      const response = await AuthManager.signupUser(formData, dispatch);

      if (!response) {
        throw new AuthenticationError('No response received from signup process');
      }

      if (response.error && response.error.code) {
        setError('password', { type: 'custom', message: response.error.message });
      }

      if (response.user) {
        delayNavigate('/');
      }

    } catch (error) {
      const signupError = new AuthenticationError('Failed to signup');
      handleError(signupError);
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
        emailChecked && !emailExists
          ? handleSubmit(handleSignupFormSubmit)
          : handleSubmit(handleEmailSubmit)
      }
      className='signup-form'
    >
      <div className='sf-top'>
        <h1 className='sf-heading'>Create your account</h1>
      </div>
      <div className='sf-inputs-container'>
        <Controller
          name='email'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <div className='sf-email'>
              <input
                type='text'
                placeholder=' '
                autoComplete='current-email'
                {...field}
                disabled={emailChecked && !emailExists}
                className={errors.email ? 'input-error' : ''}
              />
              <label htmlFor='email' className={errors.email ? 'label-error' : ''}>{Content.auth.email.title}</label>
              {emailChecked && !emailExists && (
                <div className='edit-email-btn' onClick={handleEditButtonClick}>
                  Edit
                </div>
              )}
            </div>
          )}
        />

        {emailChecked && !emailExists && (
          <Controller
            name='password'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <div className='sf-password'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder=' '
                  autoComplete='current-password'
                  {...field}
                  minLength={10}
                  maxLength={20}
                  className={errors.password ? 'input-error' : ''}
                />
                <label htmlFor='password' className={errors.password ? 'label-error' : ''}>{Content.auth.password.title}</label>
                <button
                  className='show-signup-pw-btn'
                  type='button'
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <Icons.EyeOpen size={20} />
                  ) : (
                    <Icons.EyeClose size={20} />
                  )}
                </button>
              </div>
            )}
          />
        )}
        <ValError error={errors.email?.message || ''} />
        {emailChecked && !emailExists && (
          <SignupValidation currentInputPassword={currentPassword} />
        )}
      </div>

      <button className='signup-submit-btn' type='submit'>
        {'Continue'}
      </button>
    </form>
  );
};
