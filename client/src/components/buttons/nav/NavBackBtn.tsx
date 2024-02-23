import { useNavigate } from "react-router-dom";

import { Icons } from "../../../lib/Icons";

export const NavBackBtn = () => {
	const navigate = useNavigate();

	const handleBackClick = () => {
		navigate(-1);
	}

	return (
		<button className="nav-back-btn" onClick={handleBackClick}>
			<Icons.ArrowLeft size={27} className='icon'/>
		</button>
	)
}