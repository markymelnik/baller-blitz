import { useEffect } from 'react';
import './signup-validation.scss';

type SignupValidationProps = {
	currentInputPassword: string,
  onValidationChange: (isValid: boolean) => void,
}

export const SignupValidation = ({ currentInputPassword, onValidationChange }: SignupValidationProps) => {
	const hasUpperCaseLetter = /[A-Z]/.test(currentInputPassword);
	const hasLowerCaseLetter = /[a-z]/.test(currentInputPassword);
	const hasDigit = /\d/.test(currentInputPassword);
	const isCorrectLength = currentInputPassword.length >= 10 && currentInputPassword.length <= 20;

  useEffect(() => {
    const isValid = hasUpperCaseLetter && hasLowerCaseLetter && hasDigit && isCorrectLength;
    onValidationChange(isValid);
  }, [hasUpperCaseLetter, hasLowerCaseLetter, hasDigit, isCorrectLength, onValidationChange])

	const getColorClass = (isValid: boolean) => {
		if (!currentInputPassword) return 'black';
		return isValid ? 'green': 'red';
	}

	return (
    <div className='signup-validation'>
      <div className='signup-check'>
        <div className={`length-check ${getColorClass(isCorrectLength)}`}>
          Password must be between 10 and 20 characters
        </div>
      </div>
      <div className='signup-check'>
        <div
          className={`upper-lower-case-check ${getColorClass(hasUpperCaseLetter && hasLowerCaseLetter)}`}
        >
          Must contain upper and lower case letters
        </div>
      </div>
      <div className='signup-check'>
        <div className={`number-check ${getColorClass(hasDigit)}`}>
          Must contain at least 1 number
        </div>
      </div>
    </div>
  );
}