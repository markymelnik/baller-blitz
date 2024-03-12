import { Icons } from "../../../lib/Icons.ts";

import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx";
import './nav-to-btns.scss';

export const NavToSettingsBtn = () => {
	return (
		<NavigateToButtonCreator 
			toRoute={'/settings'}
			className={'nav-to-settings-btn'}
			buttonText={'Settings'}
		>
			<Icons.Gear className='icon' />
		</NavigateToButtonCreator>
	)
}