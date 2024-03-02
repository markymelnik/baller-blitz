import { useNavigate } from "react-router-dom";

import { Icons } from "../../../lib/Icons";
import './nav-to-btns.scss';

export const NavBackBtn = () => {
	const navigate = useNavigate();

	const handleBackClick = () => {
		navigate(-1);
	}

	return (
		<button className="nav-back-btn" onClick={handleBackClick}>
			<Icons.ArrowLeft size={25} className='icon'/>
		</button>
	)
}