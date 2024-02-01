import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {  BackendUser, LoginCredentials } from '../../types.ts';
import { loginUser } from '../../api/loginUser.ts';
import { setAuthentication } from '../../redux/slices/authSlice.ts';
import { setUser } from '../../redux/slices/userSlice.ts';
import { setAccessToken } from '../../redux/slices/tokenSlice.ts';
import './login-form.scss';

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
      const responseData: BackendUser = await loginUser(formData);
      const { user, accessToken } = {...responseData};

      dispatch(setAccessToken(accessToken));
      dispatch(setAuthentication(true));
      dispatch(setUser(user));

      navigate('/profile');
      
    } catch (error) {
      console.error('Error logging in');
    }
  };

  return (
    <div className='login-form'>
      <div className='login-form-heading'>Login</div>
      <form onSubmit={handleSubmit(handleLoginFormSubmit)}>
        <div className='login-email-field'>
          <label>Email</label>
          <input
            type='email'
            {...register('email', { required: '*Email is required' })}
          />
          {errors.email && (
            <p className='login-error-message'>{errors.email.message}</p>
          )}
        </div>

        <div className='login-password-field'>
          <label>Password</label>
          <input
            type='password'
            {...register('password', { required: '*Password is required' })}
          />
          {errors.password && (
            <p className='login-error-message'>{errors.password.message}</p>
          )}
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};