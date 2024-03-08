import { createPortal } from "react-dom";
import { useRef } from "react";

import { Icons } from "../../../lib/Icons";
import { useOutsideClick } from "../../../hooks/page/useOutsideClick";
import { LogoutButton } from "../../buttons/LogoutButton/LogoutButton";
import { NavToHomeBtn } from "../../buttons/nav/NavToHomeBtn";
import { NavToGamesBtn } from "../../buttons/nav/NavToGamesBtn";
import { NavToFriendsBtn } from "../../buttons/nav/NavToFriendsBtn";
import { ColorBtn } from "../../buttons/ColorBtn/ColorBtn";
import { NavToProfileBtn } from "../../buttons/nav/NavToProfileBtn";
import { useUserDetails } from "../../../hooks/stateSelectors";
import './mobile-overlay.scss';

type MobileOverlayProps = {
	isOpen: boolean;
	onClose: () => void;
}

export const MobileOverlay = ({ isOpen, onClose }: MobileOverlayProps) => {

	const overlayRef = useRef(null);
	useOutsideClick(overlayRef, onClose);

	const userDetails = useUserDetails()!;
	const { username } = userDetails;

	return createPortal(
		<div className={`mobile-overlay ${isOpen ? `slide-in` : ``}`} ref={overlayRef}>
			<button className="mo-close-btn" onClick={onClose}><Icons.Close /></button>
			<nav className="mo-nav">
				<NavToHomeBtn />
				<NavToGamesBtn />
				<NavToFriendsBtn />
			</nav>
			<div className="mo-space">
				<NavToProfileBtn />
				<div className="mo-username">{username || 'username_error'}</div>
			</div>
			<div className="mo-bo">
			<ColorBtn />
			<div className="mo-divider"><div className="divider"></div></div>
			<LogoutButton />
			</div>

		</div>,
		document.getElementById('portal-root')!
	)
}