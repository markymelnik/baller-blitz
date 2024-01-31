import { useNavigate } from 'react-router-dom';

import { Front } from "../components/Front/Front.tsx";
import { NavigateToLoginButton } from '../components/buttons/NavigateToLoginButton.tsx';

export const FrontPage = () => {

	const navigate = useNavigate();

	return (
		<div className="front-page">
			<Front />
			<NavigateToLoginButton />
			<button style={{ padding: '1rem 2rem' }} onClick={() => navigate('/signup')}>Signup</button>
			<button style={{ padding: '1rem 2rem' }} onClick={() => navigate('/profile')}>Profile</button>
		</div>
	)
}