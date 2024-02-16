import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { SignupCredentials } from '../../../types/authTypes.ts';
import { AuthManager } from '../../../managers/AuthManager.ts';
import { AuthenticationError } from '../../../errors/ErrorClasses.ts';
import { handleError } from '../../../errors/handleError.ts';
import { SignupValidation } from '../InputValidation/SignupValidation/SignupValidation.tsx';
import { ValidationErrorMessage } from '../InputValidation/ValidationErrorMessage/ValidationErrorMessage.tsx';
import { useDelayNavigate } from '../../../hooks/page/useDelayNavigate.ts';
import { Content } from '../../../lib/Content.ts';
import './signup-form.scss';

export const SignupForm = () => {

  const dispatch = useDispatch();
  const delayNavigate = useDelayNavigate();
  
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<SignupCredentials>();

  const currentInputPassword = watch('password') || '';

  const handleSignupFormSubmit = async (formData: SignupCredentials) => {
    try {
      const response = await AuthManager.signupUser(formData, dispatch);

      if (!response) {
        throw new AuthenticationError('No response received from signup process');
      }

      if (response.error && response.error.code) {
        setError('email', { type: 'custom', message: response.error.message });
      }

      if (response.user) {
        delayNavigate('/');
      }

    } catch (error) {
      const signupError = new AuthenticationError('Failed to signup');
      handleError(signupError);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignupFormSubmit)}
      className='signup-form'
    >
      <div className="signup-form-top">
        <div className='signup-form-heading'>{Content.auth.signup.title}</div>
        <div className="signup-form-subheading">{Content.auth.signup.prompt}</div>
      </div>
      <div className='signup-input-fields'>
        <Controller
          name='email'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <div className='signup-email-field floating-label'>
              <input
                type='text'
                placeholder=' '
                autoComplete='current-email'
                {...field}
              />
              <label htmlFor='email'>{Content.auth.email.title}</label>
            </div>
          )}
        />

        <Controller
          name='password'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <div className='signup-password-field floating-label'>
              <input
                type='password'
                placeholder=' '
                autoComplete='current-password'
                {...field}
                minLength={10}
                maxLength={20}
              />
              <label htmlFor='password'>{Content.auth.password.title}</label>
            </div>
          )}
        />
      </div>
      <ValidationErrorMessage error={errors.email?.message || ''} />
      <SignupValidation currentInputPassword={currentInputPassword} />
      <button
        className='signup-submit-btn'
        type='submit'
      >
        {Content.auth.signup.title}
      </button>
    </form>
  );
};
