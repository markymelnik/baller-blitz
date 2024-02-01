import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { SignupCredentials } from '../../../types/authTypes.ts';
import { AuthManager } from '../../../auth/AuthManager.ts';
import './signup-form.scss';

export const SignupForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupCredentials>();

  const handleSignupFormSubmit = async (formData: SignupCredentials) => {
    try {
      await AuthManager.signupUser(formData);

      navigate('/profile');
    } catch (error) {
      console.error('Error signing up');
    }
  };

  return (
    <div className='signup-form'>
      <div className='signup-form-heading'>Sign Up</div>
      <form onSubmit={handleSubmit(handleSignupFormSubmit)}>
        <div className='signup-email-field'>
          <label>Email</label>
          <input
            type='email'
            {...register('email', { required: '*Email is required' })}
          />
          {errors.email && (
            <p className='signup-error-message'>{errors.email.message}</p>
          )}
        </div>
        <div className='signup-password-field'>
          <label>Password</label>
          <input
            type='password'
            {...register('password', { required: '*Password is required' })}
          />
          {errors.password && (
            <p className='signup-error-message'>{errors.password.message}</p>
          )}
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};
