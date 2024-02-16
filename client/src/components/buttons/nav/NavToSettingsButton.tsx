import { Icons } from "../../../lib/Icons.ts";

import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx"

export const NavToSettingsButton = () => {
	return (
		<NavigateToButtonCreator 
			toRoute={'/settings'}
			className={'nav-to-settings-btn'}
		>
			<Icons.Gear size={32} />
		</NavigateToButtonCreator>
	)
}