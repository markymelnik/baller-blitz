import { SelectOverlayState } from '../PickSubmitButton/SelectOverlayState.ts';
import './pick-team-btn.scss';

type PickTeamButtonProps = {
	team: string;
	teamTricode: string;
	selectWinner: (team: string) => void;
	selectedWinner: string;
	overlayState: string;
}

export const PickTeamButton = ({ ...props }: PickTeamButtonProps) => {

	const { team, teamTricode, selectWinner, selectedWinner, overlayState } = {...props};

	const isSelected = selectedWinner === teamTricode;
	const isConfirmState = overlayState === SelectOverlayState.CONFIRM;
	const isSubmitState = overlayState === SelectOverlayState.SUBMIT;

	let additionalClass = '';
	if (isSelected) {
		if (isConfirmState) {
			additionalClass = 'confirm'
		} else if (isSubmitState) {
			additionalClass = 'submit'
		}
	}

	const className = `${team}-team ${additionalClass}`;

	return (
		<div className={className} onClick={() => selectWinner(team)}>
			{teamTricode}
		</div>
	)
}