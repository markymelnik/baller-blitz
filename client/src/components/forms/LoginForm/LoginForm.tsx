import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LoginCredentials } from '../../../types/authTypes.ts';
import { AuthManager } from '../../../auth/AuthManager.ts';
import { AuthenticationError } from '../../../errors/ErrorClasses.ts';
import { handleError } from '../../../errors/handleError.ts';
import './login-form.scss';

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const email = watch('email');
  const password = watch('password');
  const isSubmitDisabled: boolean = !email || !password;

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

        <div className='login-email-field floating-label'>
          <input
            type='email'
            placeholder=' '
            {...register('email', { required: '*Email is required' })}
          />
          <label htmlFor="email">Email</label>
          {errors.email && (
            <p className='login-error-message'>{errors.email.message}</p>
          )}
        </div>

        <div className='login-password-field floating-label'>
          <input
            type='password'
            placeholder=' '
            {...register('password', { required: '*Password is required' })}
          />
          <label htmlFor="password">Password</label>
          {errors.password && (
            <p className='login-error-message'>{errors.password.message}</p>
          )}
        </div>

      </div>
      <button className='login-submit-btn' type="submit" disabled={isSubmitDisabled}>Log In</button>
    </form>
  );
};