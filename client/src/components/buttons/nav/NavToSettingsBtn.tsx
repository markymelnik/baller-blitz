import { Icons } from "../../../lib/Icons.ts";

import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx"

export const NavToSettingsBtn = () => {
	return (
		<NavigateToButtonCreator 
			toRoute={'/settings'}
			className={'nav-to-settings-btn'}
		>
			<Icons.Gear size={28} color='black' />
		</NavigateToButtonCreator>
	)
}