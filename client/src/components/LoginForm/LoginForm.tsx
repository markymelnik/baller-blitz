import { useForm } from 'react-hook-form';

type LoginFormInputTypes = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputTypes>();

  const handleLoginFormSubmit = (formData: LoginFormInputTypes) => {
    console.log(formData);
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
      </form>
    </div>
  );
};
