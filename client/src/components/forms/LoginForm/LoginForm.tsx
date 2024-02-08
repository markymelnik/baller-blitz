import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { LoginCredentials } from '../../../types/authTypes.ts';
import { AuthManager } from '../../../auth/AuthManager.ts';
import { AuthenticationError } from '../../../errors/ErrorClasses.ts';
import { handleError } from '../../../errors/handleError.ts';
import { ValidationErrorMessage } from '../InputValidation/ValidationErrorMessage/ValidationErrorMessage.tsx';
import { useDelayNavigate } from '../../../hooks/useDelayNavigate.ts';
import './login-form.scss';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const delayNavigate = useDelayNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginCredentials>();

  const handleLoginFormSubmit = async (formData: LoginCredentials) => {
    try {
      const response = await AuthManager.loginUser(formData, dispatch);

      if (!response) {
        throw new AuthenticationError('No response received from login process');
      }

      if (response.error && response.error.code) {
        setError('email', { type: 'custom', message: response.error.message });
      }

      if (response.user) {
        delayNavigate('/profile')
      }

    } catch (error) {
      const loginError = new AuthenticationError('Failed to login');
      handleError(loginError);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLoginFormSubmit)} className='login-form'>
      <div className="login-form-top">
        <div className='login-form-heading'>Login</div>
        <div className="login-form-subheading">Enter your email and password</div>
      </div>
      
      <div className='login-input-fields'>
        <Controller
          name='email'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <div className='login-email-field floating-label'>
              <input type='email' placeholder=' ' autoComplete='current-email' {...field} />
              <label htmlFor='email'>Email</label>
            </div>
          )}
        />

        <Controller
          name='password'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <div className='login-password-field floating-label'>
              <input
                type='password'
                placeholder=' '
                autoComplete='current-password'
                {...field}
                maxLength={20}
              />
              <label htmlFor='password'>Password</label>
            </div>
          )}
        />
      </div>
      <ValidationErrorMessage error={errors.email?.message || ''} />
      <button
        className='login-submit-btn'
        type='submit'
      >
        Log In
      </button>
    </form>
  );
};
