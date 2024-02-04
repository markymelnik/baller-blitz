import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { SignupCredentials } from '../../../types/authTypes.ts';
import { AuthManager } from '../../../auth/AuthManager.ts';
import { AuthenticationError } from '../../../errors/ErrorClasses.ts';
import { handleError } from '../../../errors/handleError.ts';
import './signup-form.scss';

export const SignupForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupCredentials>();

  const email = watch('email');
  const password = watch('password');
  const isSubmitDisabled: boolean = !email || !password;

  const handleSignupFormSubmit = async (formData: SignupCredentials) => {
    try {
      await AuthManager.signupUser(formData);

      navigate('/profile');
    } catch (error) {
      const signupError = new AuthenticationError('Failed to signup');
      handleError(signupError);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignupFormSubmit)} className='signup-form'>
      <div className='signup-form-heading'>Sign Up</div>
      <div className="signup-input-fields">

      <div className='signup-email-field floating-label'>
        <input
          type='email'
          placeholder= ' '
          {...register('email', { required: '*Email is required' })}
        />
        <label htmlFor="email">Email</label>
        {errors.email && (
          <p className='signup-error-message'>{errors.email.message}</p>
        )}
      </div>

      <div className='signup-password-field floating-label'>
        <input
          type='password'
          placeholder= ' '
          {...register('password', { required: '*Password is required' })}
        />
        <label htmlFor="password">Password</label>
        {errors.password && (
          <p className='signup-error-message'>{errors.password.message}</p>
        )}
      </div>

      </div>
      <button className='signup-submit-btn' type='submit' disabled={isSubmitDisabled}>Sign Up</button>
    </form>
  );
};
