import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { LoginCredentials } from '../../../types/authTypes.ts';
import { AuthManager } from '../../../managers/AuthManager.ts';
import { AuthenticationError } from '../../../errors/ErrorClasses.ts';
import { handleError } from '../../../errors/handleError.ts';
import { ValError } from '../InputValidation/ValError/ValError.tsx';
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
      /* console.log(formData.email); */
      const response = await AuthManager.checkIfEmailExists(formData.email);
      /* console.log(response); */
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
      const emailError = new AuthenticationError('Failed to submit email');
      handleError(emailError);
    }
  }

  const handleLoginFormSubmit = async (formData: LoginCredentials) => {
    try {
      const response = await AuthManager.loginUser(formData, dispatch);
      if (!response) {
        throw new AuthenticationError('No response received from login process');
      }

      if (response.error && response.error.code) {
        setError('password', { type: 'custom', message: response.error.message });
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
      <div className='lf-top'>
        <h1 className='lf-heading'>
          {emailExists ? (`${Content.auth.login.prompt.yesEmail}`) : (`${Content.auth.login.prompt.noEmail}`)}
        </h1>
      </div>
      <div className='lf-inputs-container'>
        <Controller
          name='email'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <div className='lf-email'>
              <input
                type='email'
                id='lf-email'
                placeholder=' '
                autoComplete='current-email'
                {...field}
                disabled={emailChecked && emailExists}
                className={errors.email ? 'input-error' : ''}
              />
              <label htmlFor='lf-email' className={errors.email ? 'label-error' : ''}>{Content.auth.email.title}</label>
              {emailChecked && emailExists && (
                <div className='edit-email-btn' onClick={handleEditButtonClick}>
                  {Content.common.edit}
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
              <div className='lf-password'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='lf-password'
                  placeholder=' '
                  autoComplete='current-password'
                  {...field}
                  maxLength={20}
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors('email');
                  }}
                  className={errors.password ? 'input-error' : ''}
                />
                <label htmlFor='lf-password' className={errors.password ? 'label-error' : ''}>{Content.auth.password.title}</label>
                <button className='show-login-pw-btn' type='button' onClick={() => setShowPassword(prev => !prev)}>
                  {showPassword ? <Icons.EyeOpen size={20} /> : <Icons.EyeClose size={20} />}
                </button>
              </div>
            )}
          />
        )}
      </div>
      <ValError error={errors.email?.message || ''} />
      <ValError error={errors.password?.message || ''} />
      <button className='login-submit-btn' type='submit'>
        {'Continue'}
      </button>
    </form>
  );
};
