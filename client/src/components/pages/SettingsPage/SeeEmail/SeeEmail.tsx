import { useUserDetails } from '../../../../hooks/stateSelectors';
import './see-email.scss';

export const SeeEmail = () => {
	
	const userDetails = useUserDetails()!;

	const { email } = userDetails;

	return (
		<div className="see-email">
			<div className="current-email">{email}</div>
		</div>
	)
}