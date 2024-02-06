import { ReactNode } from 'react';

import './pick-submit-btn.scss';
import { SelectOverlayState } from './SelectOverlayState.ts';

type PickSubmitButtonProps = {
	onClick: () => void;
	children: ReactNode;
	state: SelectOverlayState;
}

export const PickSubmitButton = ({ onClick, children, state }: PickSubmitButtonProps) => {

	const getButtonClassName = (state: SelectOverlayState) => {
		switch(state) {
			case SelectOverlayState.CONFIRM:
				return 'pick-submit-btn confirm';
			case SelectOverlayState.SUBMIT:
				return 'pick-submit-btn submit';
			default:
				return 'pick-submit-btn select-winner'
		}
	}
	
	return (
		<button className={getButtonClassName(state)} onClick={onClick}>
			{children}
		</button>
	)
}