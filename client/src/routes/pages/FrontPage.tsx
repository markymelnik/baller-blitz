import { FrontButtons } from "../../components/Front/FrontButtons/FrontButtons.tsx";
import { FrontWelcome } from "../../components/Front/FrontWelcome/FrontWelcome.tsx";

export const FrontPage = () => {

	return (
		<div className="front-page">
			<FrontWelcome />
			<FrontButtons />
			{/* <button style={{ padding: '1rem 2rem' }} onClick={() => navigate('/profile')}>Profile</button> */}
		</div>
	);
};