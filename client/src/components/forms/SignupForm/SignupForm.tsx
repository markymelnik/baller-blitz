import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { SignupCredentials } from '../../../types/authTypes.ts';
import { AuthManager } from '../../../auth/AuthManager.ts';
import './signup-form.scss';
import { AuthenticationError } from '../../../errors/ErrorClasses.ts';
import { handleError } from '../../../errors/handleError.ts';

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
      const signupError = new AuthenticationError('Failed to signup');
      handleError(signupError);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignupFormSubmit)} className='signup-form'>
      <div className='signup-form-heading'>Sign Up</div>
      <div className="signup-input-fields">
      <div className='signup-email-field'>
        {/* <label>Email</label> */}
        <input
          type='email'
          placeholder='Email'
          {...register('email', { required: '*Email is required' })}
        />
        {errors.email && (
          <p className='signup-error-message'>{errors.email.message}</p>
        )}
      </div>
      <div className='signup-password-field'>
        {/* <label>Password</label> */}
        <input
          type='password'
          placeholder='Password'
          {...register('password', { required: '*Password is required' })}
        />
        {errors.password && (
          <p className='signup-error-message'>{errors.password.message}</p>
        )}
      </div>
      </div>
      
      <button className='signup-submit-btn' type='submit'>Sign Up</button>
    </form>
  );
};
