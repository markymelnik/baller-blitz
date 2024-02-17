import { Content } from '../../../../lib/Content';
import './signup-validation.scss';

type SignupValidationProps = {
	currentInputPassword: string,
}

export const SignupValidation = ({ currentInputPassword }: SignupValidationProps) => {
	const hasUpperCaseLetter = /[A-Z]/.test(currentInputPassword);
	const hasLowerCaseLetter = /[a-z]/.test(currentInputPassword);
	const hasDigit = /\d/.test(currentInputPassword);
	const isCorrectLength = currentInputPassword.length >= 10 && currentInputPassword.length <= 20;

	const getColorClass = (isValid: boolean) => {
		if (!currentInputPassword) return 'black';
		return isValid ? 'green': 'red';
	}

	return (
    <div className='signup-validation'>
      <div className="sv-title">{Content.auth.password.title}</div>
      <div className='signup-check'>
        <div className={`length-check ${getColorClass(isCorrectLength)}`}>
          {Content.auth.signup.validationPrompt[1]}
        </div>
      </div>
      <div className='signup-check'>
        <div
          className={`upper-lower-case-check ${getColorClass(hasUpperCaseLetter && hasLowerCaseLetter)}`}
        >
          {Content.auth.signup.validationPrompt[2]}
        </div>
      </div>
      <div className='signup-check'>
        <div className={`number-check ${getColorClass(hasDigit)}`}>
        {Content.auth.signup.validationPrompt[3]}
        </div>
      </div>
    </div>
  );
}