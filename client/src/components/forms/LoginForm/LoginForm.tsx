import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LoginCredentials } from '../../../types/authTypes.ts';
import { AuthManager } from '../../../auth/AuthManager.ts';
import './login-form.scss';
import { AuthenticationError } from '../../../errors/ErrorClasses.ts';
import { handleError } from '../../../errors/handleError.ts';

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const handleLoginFormSubmit = async (formData: LoginCredentials) => {
    try {
      await AuthManager.loginUser(formData, dispatch);

      navigate('/profile');
    } catch (error) {
      const loginError = new AuthenticationError('Failed to login');
      handleError(loginError);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLoginFormSubmit)} className='login-form'>
      <div className='login-form-heading'>Login</div>
      <div className='login-input-fields'>
        <div className='login-email-field'>
          {/* <label>Email</label> */}
          <input
            type='email'
            placeholder='Email'
            {...register('email', { required: '*Email is required' })}
          />
          {errors.email && (
            <p className='login-error-message'>{errors.email.message}</p>
          )}
        </div>
        <div className='login-password-field'>
          {/* <label>Password</label> */}
          <input
            type='password'
            placeholder='Password'
            {...register('password', { required: '*Password is required' })}
          />
          {errors.password && (
            <p className='login-error-message'>{errors.password.message}</p>
          )}
        </div>
      </div>
      <button className='login-submit-btn' type="submit">Log In</button>
    </form>
  );
};