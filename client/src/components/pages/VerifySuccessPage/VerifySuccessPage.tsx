import { Content } from '../../../lib/Content';
import { NavigateToHomeButton } from '../../buttons/nav/NavigateToHomeButton';
import './verify-success-page.scss';

export const VerifySuccessPage = () => {

	return (
		<div className="verify-success-page">
			<div className="verify-success-title">{Content.verifySuccess.message}</div>
			<NavigateToHomeButton />
		</div>
	)
}