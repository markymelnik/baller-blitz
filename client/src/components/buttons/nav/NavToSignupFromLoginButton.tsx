import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx"

export const NavToSignupFromLoginButton = () => {
	return (
		<NavigateToButtonCreator 
			toRoute={'/signup'}
			buttonText={'Sign Up'}
			className={'to-signup-from-login-btn'}
		/>
	)
}