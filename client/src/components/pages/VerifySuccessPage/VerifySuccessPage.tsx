import { Content } from '../../../lib/Content';
import { NavToHomeBtn } from '../../buttons/nav/NavToHomeBtn';
import './verify-success-page.scss';

export const VerifySuccessPage = () => {

	return (
		<div className="verify-success-page">
			<div className="verify-success-title">{Content.verifySuccess.message}</div>
			<NavToHomeBtn />
		</div>
	)
}