import { Content } from "../../../../lib/Content.ts"
import { NavigateToButtonCreator } from "../NavigateToButtonCreator.tsx"
import '../nav-to-btns.scss';

export const NavToSignupFromLoginButton = () => {
	return (
		<NavigateToButtonCreator 
			toRoute={'/signup'}
			buttonText={Content.auth.signup.title}
			className={'to-signup-from-login-btn'}
		/>
	)
}