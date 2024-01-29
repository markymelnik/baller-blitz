import { useForm } from 'react-hook-form';

import { SignupCredentials } from '../../types.ts';
import './signup-form.scss';
import { signupUser } from '../../api/signupUser.tsx';

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupCredentials>();

  const handleSignupFormSubmit = async (formData: SignupCredentials) => {
    try {
      const responseData = await signupUser(formData);
      console.log(responseData);
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
            type='text'
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
