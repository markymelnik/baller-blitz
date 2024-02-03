import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx";
import './nav-to-btns.scss';

export const NavigateToSignupButton = () => {
	return <NavigateToButtonCreator toRoute='/signup' buttonText={'Signup'} className='nav-to-signup-btn' />
}