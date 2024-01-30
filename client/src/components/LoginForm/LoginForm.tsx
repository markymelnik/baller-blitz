import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { BackendUser, LoginCredentials } from '../../types.ts';
import { loginUser } from '../../api/loginUser.tsx';
import './login-form.scss';
import { setAuthentication } from '../../redux/slices/authSlice.ts';
import { setUser } from '../../redux/slices/userSlice.ts';

export const LoginForm = () => {

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const handleLoginFormSubmit = async (formData: LoginCredentials) => {
    try {
      const responseData: BackendUser = await loginUser(formData);
      const { /* token,  */user } = {...responseData};

      dispatch(setAuthentication(true));
      dispatch(setUser(user));
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
